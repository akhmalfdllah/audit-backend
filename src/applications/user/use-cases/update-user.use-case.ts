import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ArgonService } from "src/shared/services/argon.service";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { UpdateUserBodyTransformed } from "src/applications/user/dto/update-user-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity";
import { Group } from "src/core/group/entities/group.entity";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly groupRepository: GroupRepository,
        private readonly argonService: ArgonService,
        private readonly auditLogFacade: AuditLogFacade,
    ) { }

    async execute(id: string, dto: UpdateUserBodyTransformed) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException("user not found");

        const { password, confirmPassword, groupId, actorId, ...rest } = dto;

        if (password && password !== confirmPassword) {
            throw new BadRequestException("confirm password not match");
        }
        let group: Group;

        const resolvedGroupId = typeof groupId === 'object' && groupId !== null ? groupId.id : groupId;

        if (resolvedGroupId) {
            group = await this.groupRepository.findOneByIdOrThrow(resolvedGroupId);
        } else if (user.group) {
            group = user.group;
        } else {
            throw new BadRequestException("User must have a group");
        }

        const updated = await this.userRepository.save({
            ...user,
            ...rest,
            group,
            password: password ? await this.argonService.hashPassword(password) : user.password,
        });

        return plainToInstance(UserPayloadDto, updated);
    }
}
