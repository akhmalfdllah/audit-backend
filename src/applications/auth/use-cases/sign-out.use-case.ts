import { Injectable } from "@nestjs/common";
import { UpdateRefreshTokenUseCase } from "src/applications/user/use-cases/common.use-case";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity";

@Injectable()
export class SignOutUseCase {
    constructor(
        private readonly updateRefreshTokenUseCase: UpdateRefreshTokenUseCase,
        private readonly auditLogFacade: AuditLogFacade,
    ) { }

    async execute(userId: string, refreshToken: string) {
        try {
            console.log('🧾 SignOut invoked:', { userId, refreshToken });

            if (!refreshToken) {
                console.warn('⚠️ Refresh token kosong!');
                return { message: "No refresh token provided" };
            }

            await this.updateRefreshTokenUseCase.execute(userId, null);

            await this.auditLogFacade.create({
                actorId: userId,
                action: AuditAction.SIGNOUT,
                targetEntity: "User",
                targetId: userId,
                metadata: { message: "User signed out" },
            });

            return { message: "Sign out successful!" };
        } catch (err) {
            console.error('❌ Error saat sign out:', err);
            throw new Error("Failed to sign out");
        }
    }
}
