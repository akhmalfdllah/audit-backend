import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ArgonService } from "src/shared/services/argon.service";
import { UserRepository, relations } from "src/interfaces/http/user/user.repository";
import { GroupRepository } from "src/core/group/group.repository";
import { CreateUserBodyDto } from "src/interfaces/http/user/dto/create-user-body.dto";
import { VerifyUserBodyDto } from "src/interfaces/http/user/dto/verify-user-body.dto";
import { UpdateUserBodyTransformed } from "src/interfaces/http/user/dto/update-user-body.dto";
import { SafeUpdateBodyDto } from "src/interfaces/http/user/dto/safe-update-body.dto";
import { SearchUserQueryTransformed } from "src/interfaces/http/user/dto/search-user-query.dto";
import { UserPayloadDto } from "src/interfaces/http/user/dto/user-payload.dto";
import { isMatch, isNotMatch } from "src/shared/utils/common.util";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private groupRepository: GroupRepository,
    //private nodeTreeRepository: NodeTreeRepository,
    private argonService: ArgonService,
  ) {}

  async create({ username, confirmPassword, ...bodyDto }: CreateUserBodyDto) {
    const user = await this.userRepository.findOneBy({ username });
    if (user) {
      throw new BadRequestException("user already exists!");
    }

    if (bodyDto.password !== confirmPassword) {
      throw new BadRequestException("confirm password not match!");
    }
    const password = await this.argonService.hashPassword(bodyDto.password);
    const entity = this.userRepository.create({ ...bodyDto, username, password });
    const saved = await this.userRepository.save(entity);
    return plainToInstance(UserPayloadDto, saved);
  }

  async findAll(searchUserQueryDto: SearchUserQueryTransformed) {
    const users = await this.userRepository.find({ where: searchUserQueryDto, relations });
    return plainToInstance(UserPayloadDto, users);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneOrFail({ where: { id }, relations }).catch(() => {
      throw new NotFoundException("user not found!");
    });
    return plainToInstance(UserPayloadDto, user);
  }

  async update(id: string, updateUserBodyDto: UpdateUserBodyTransformed) {
    const user = await this.userRepository.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException("user not found!");
    });

    if (updateUserBodyDto.group) {
      const id = updateUserBodyDto.group.id;
      const group = await this.groupRepository.findOneByOrFail({ id }).catch(() => {
        throw new NotFoundException("group not found!");
      });
      user.group = group;
    }

    const updated = await this.userRepository.save({ ...user, ...updateUserBodyDto });
    return plainToInstance(UserPayloadDto, updated);
  }

  async safeUpdate(id: string, { password, confirmPassword, ...safeUpdateBodyDto }: SafeUpdateBodyDto) {
    if (isNotMatch(password, confirmPassword)) {
      throw new BadRequestException("confirm password not match!");
    }
    const user = await this.userRepository.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException("user not found!");
    });
    const hashPassword = await this.argonService.hashPassword(password);
    const saved = await this.userRepository.save({ ...user, ...safeUpdateBodyDto, password: hashPassword });
    return plainToInstance(UserPayloadDto, saved);
  }

  // async retrieveGroup(id: string) {
  //   const group = await this.groupRepository
  //     .findOneOrFail({ where: { members: { id } }, relations: groupRelations })
  //     .catch(() => {
  //       throw new NotFoundException("you are not registered in any group!");
  //     });

  //   if (group.apps && group.apps.length) {
  //     const appsId = group.apps.map((app) => app.id);
  //     const appTrees = await this.nodeTreeRepository.findTrees();
  //     const apps = appTrees.filter((tree) => appsId.includes(tree.id) && isMatch(tree.isActive, true));
  //     group.apps = apps;
  //   }

  //   return group;
  // }

  async verifyUser({ password, username }: VerifyUserBodyDto) {
    const user = await this.userRepository.findOneByOrFail({ username }).catch(() => {
      throw new BadRequestException("invalid username or password!");
    });
    const isValid = await this.argonService.verifyPassword(user.password, password);
    if (!isValid) {
      throw new BadRequestException("invalid username or password!");
    }
    return plainToInstance(UserPayloadDto, user);
  }

  async verifyUserWithRefreshToken(id: string, refreshToken: string) {
    const user = await this.userRepository.findOneByOrFail({ id, refreshToken }).catch(() => {
      throw new UnauthorizedException("invalid token!");
    });
    return plainToInstance(UserPayloadDto, user);
  }

  async signOut(id: string, refreshToken: string) {
    const user = await this.userRepository.findOneByOrFail({ id, refreshToken }).catch(() => {
      throw new UnauthorizedException("invalid token!");
    });
    const updated = await this.userRepository.update(user.id, { refreshToken: null });
    return plainToInstance(UserPayloadDto, updated);
  }

  async updateRefreshToken(user: UserPayloadDto, refreshToken: string) {
    const updated = await this.userRepository.save({ ...user, refreshToken });
    return plainToInstance(UserPayloadDto, updated);
  }

  async delete(id: string) {
    const user = await this.userRepository.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException("user not found!");
    });
    const deleted = await this.userRepository.remove(user).catch(() => {
      throw new ConflictException(
        "unable to delete this record due to existing references in related tables.",
      );
    });
    return { message: `user ${deleted.username} successfully deleted.` };
  }
}
