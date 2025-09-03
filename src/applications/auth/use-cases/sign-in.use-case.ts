import { Injectable } from "@nestjs/common";
import { TokenService } from "src/shared/services/token.service";
import { SignInBodyDto } from "src/applications/auth/dto/signin-body.dto";
import { VerifyUserUseCase } from "src/applications/user/use-cases/verify-user.use-case";
import { RefreshTokenUseCase } from "./refresh-token.use-case";

@Injectable()
export class SignInUseCase {
    constructor(
        private readonly updateRefreshTokenUseCase: RefreshTokenUseCase,
        private readonly tokenService: TokenService,
        private readonly verifyUserUseCase: VerifyUserUseCase,
    ) { }

    async execute(signInBodyDto: SignInBodyDto) {
        console.log("🟢 SignInUseCase DIEKSEKUSI");
        // ✅ Verifikasi kredensial
        const user = await this.verifyUserUseCase.execute(signInBodyDto);

        const payload = {
            id: user.id,
            username: user.username,
            role: user.role,
            fullName: user.fullName,
        };
        const { jwtAccessToken, jwtRefreshToken } = await this.tokenService.generateTokens(payload);
        console.log("📦 JWT Tokens:", { jwtAccessToken, jwtRefreshToken });
        console.log("👤 User:", user);
        // ✅ Simpan refresh token ke DB (hashed, di use-case lain)
        
        console.log("🔃 Memanggil updateRefreshTokenUseCase...");
        await this.updateRefreshTokenUseCase.execute(user.id, { refreshToken: jwtRefreshToken });
        console.log("✅ Selesai update hashed refresh token!");

        return {
            accessToken: jwtAccessToken,
            refreshToken: jwtRefreshToken,
            user,
        };
    }
}
