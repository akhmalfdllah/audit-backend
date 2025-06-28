import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ArgonService } from "src/shared/services/argon.service";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { UpdateUserBodyDto } from "src/applications/user/dto/update-user-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly groupRepository: GroupRepository,
        private readonly argonService: ArgonService,
        private readonly auditLogFacade: AuditLogFacade,
    ) { }

    async execute(id: string, dto: UpdateUserBodyDto) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException("user not found");

        const { password, confirmPassword, groupIds, actorId, ...rest } = dto;

        if (password && password !== confirmPassword) {
            throw new BadRequestException("confirm password not match");
        }

        // Ambil group baru jika diperlukan
        const groups = groupIds
            ? await this.groupRepository.findByIdsOrThrow(groupIds)
            : user.groups;

        const updated = await this.userRepository.save({
            ...user,
            ...rest,
            groups,
            password: password ? await this.argonService.hashPassword(password) : user.password,
        });

        // ✅ Audit Log - Catat perubahan
        await this.auditLogFacade.create({
            actorId,
            action: AuditAction.UPDATE_USER,
            targetEntity: 'User',
            targetId: id,
            metadata: {
                before: {
                    username: user.username,
                    role: user.role,
                    groupIds: user.groups.map((g) => g.id),
                },
                after: {
                    username: updated.username,
                    role: updated.role,
                    groupIds: updated.groups.map((g) => g.id),
                },
            },
        });

        return plainToInstance(UserPayloadDto, updated);
    }
}
