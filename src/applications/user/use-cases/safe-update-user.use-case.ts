import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { ArgonService } from "src/shared/services/argon.service";
import { SafeUpdateBodyDto } from "src/applications/user/dto/safe-update-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { isNotMatch } from "src/shared/utils/common.util";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity";

@Injectable()
export class SafeUpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly argonService: ArgonService,
        private readonly auditLogFacade: AuditLogFacade,
    ) { }

    async execute(id: string, dto: SafeUpdateBodyDto, actorId: string) {
        if (!id) throw new BadRequestException("User ID is required.");
        const { password, confirmPassword } = dto;

        if (isNotMatch(password, confirmPassword)) {
            throw new BadRequestException("confirm password not match!");
        }

        let user;
        try {
            user = await this.userRepository.findOneByOrFail({ id });
        } catch {
            throw new NotFoundException("user not found!");
        }

        const hashedPassword = await this.argonService.hashPassword(password);
        if (isNotMatch(user.password, hashedPassword)) {
            throw new BadRequestException(
                "new password must be different from the old one",
            );
        }

        const saved = await this.userRepository.save({
            ...user,
            password: hashedPassword,
        });

        // ✅ Audit Log Manual
        await this.auditLogFacade.create({
            actorId,
            action: AuditAction.UPDATE_USER,
            targetEntity: "User",
            targetId: user.id,
            metadata: {
                maskedChange: true, // tidak tampilkan password
            },
        });

        return plainToInstance(UserPayloadDto, saved, {
            excludeExtraneousValues: true,
        });
    }
}
