import { BadRequestException, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ArgonService } from "src/shared/services/argon.service";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { CreateUserInput } from "src/applications/user/dto/create-user-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly argonService: ArgonService,
    private readonly groupRepository: GroupRepository,
    private readonly auditLogFacade: AuditLogFacade
  ) { }

  async execute(dto: CreateUserInput) {
    const { username, password, confirmPassword, groupId, actorId, ...rest } = dto;
    console.log('actorId:', actorId);

    if (password !== confirmPassword) {
      throw new BadRequestException("confirm password not match!");
    }

    const existing = await this.userRepository.findOneBy({ username });
    if (existing) throw new BadRequestException("user already exists!");

    const hashedPassword = await this.argonService.hashPassword(password);

    const group = await this.groupRepository.findOneByIdOrThrow(groupId);

    const saved = await this.userRepository.save({
      ...rest,
      username,
      password: hashedPassword,
      group,
    });

    return plainToInstance(UserPayloadDto, saved);
  }
}
