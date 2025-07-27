import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { TokenService } from "src/shared/services/token.service";
import { SignInBodyDto } from "src/applications/auth/dto/signin-body.dto";
import { AuthPayloadDto } from "../dto/auth-payload.dto";
import { VerifyUserUseCase } from "src/applications/user/use-cases/verify-user.use-case";
import { RefreshTokenUseCase } from "./refresh-token.use-case";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity"; // ⬅️ Pastikan enum konstan kamu simpan di satu tempat

@Injectable()
export class SignInUseCase {
    constructor(
        private readonly updateRefreshTokenUseCase: RefreshTokenUseCase,
        private readonly tokenService: TokenService,
        private readonly verifyUserUseCase: VerifyUserUseCase,
        private readonly auditLogFacade: AuditLogFacade // ✅ Tambahan untuk mencatat log aktivitas
    ) { }

    async execute(signInBodyDto: SignInBodyDto) {
        console.log("🟢 SignInUseCase DIEKSEKUSI");
        // ✅ Verifikasi kredensial
        const user = await this.verifyUserUseCase.execute(signInBodyDto);

        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
        };
        const { jwtAccessToken, jwtRefreshToken } = await this.tokenService.generateTokens(payload);
        console.log("📦 JWT Tokens:", { jwtAccessToken, jwtRefreshToken });
        console.log("👤 User:", user);
        // ✅ Simpan refresh token ke DB (hashed, di use-case lain)
        
        console.log("🔃 Memanggil updateRefreshTokenUseCase...");
        await this.updateRefreshTokenUseCase.execute(user.id, { refreshToken: jwtRefreshToken });
        console.log("✅ Selesai update hashed refresh token!");

        // ✅ Tambahkan audit log login
        await this.auditLogFacade.create({
            actorId: user.id,
            action: AuditAction.SIGNIN,
            targetEntity: "User",
            targetId: user.id,
            metadata: {
                username: user.username,
                role: user.role,
            },
        });
        // ✅ Kembalikan DTO hasil login

        return {
            accessToken: jwtAccessToken,
            refreshToken: jwtRefreshToken,
            user,
        };
    }
}
