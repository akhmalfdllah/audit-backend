import { Injectable } from "@nestjs/common";
import { UserFacadeService } from "src/interfaces/http/user/user.facade.service";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity"; // enum AuditAction.SIGNOUT

@Injectable()
export class SignOutUseCase {
    constructor(
        private readonly userFacadeService: UserFacadeService,
        private readonly auditLogFacade: AuditLogFacade,
    ) { }

    async execute(userId: string, refreshToken: string) {
        await this.userFacadeService.signOut(userId, refreshToken);

        // ✅ Catat log aktivitas logout
        await this.auditLogFacade.create({
            actorId: userId,
            action: AuditAction.SIGNOUT,
            targetEntity: 'User',
            targetId: userId,
            metadata: {
                message: 'User signed out',
            },
        });

        return { message: "Sign out successful!" };
    }
}
