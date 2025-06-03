import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserRepository } from './user.repository';
import { CreateUserBodyDto } from './dto/create-user-body.dto';
import { ArgonService } from 'src/shared/services/argon.service';
import { UserPayloadDto} from 'src/modules/user/dto/user-payload.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private argonService: ArgonService
  ) {}

  async create({ username, confirmPassword, ...bodyDto }: CreateUserBodyDto) {
    const user = await this.userRepository.findOneBy({ username });
    if (user) {
      throw new BadRequestException("user already exists");
    }

    if (bodyDto.password !== confirmPassword) {
        throw new BadRequestException("confirm password doesn't match");
  }
  const password = await this.argonService.hashPassword(bodyDto.password);
  const entity = this.userRepository.create({ ...bodyDto, username, password });
  const saved = await this.userRepository.save(entity);
  return plainToInstance(UserPayloadDto, saved);
    }

  async findAll(searchUserQueryDto: SearchUserQueryTransformed) {
    const users = await this.userRepository.find({where: searchUserQueryDto});
    return plainToInstance(UserPayloadDto, users);
  }
}
