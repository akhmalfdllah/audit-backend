import { Injectable } from "@nestjs/common";
import { UserFacadeService } from "src/interfaces/http/user/user.facade.service";
import { TokenService } from "src/shared/services/token.service";
import { hash } from "argon2"; // ✅ Pastikan ini di-import
import { plainToInstance } from "class-transformer";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly userFacadeService: UserFacadeService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(userId: string, refreshToken: string) {
    console.log("🟡 [RefreshTokenUseCase] Dipanggil dengan:", { userId, refreshToken });

    const hashedToken = await hash(refreshToken);
    console.log("🔐 Hasil hash:", hashedToken);

    await this.userFacadeService.updateHashedRefreshToken(userId, hashedToken);
    console.log("✅ Hashed refresh token disimpan ke DB");

    const user = await this.userFacadeService.findOne(userId);
    const jwtAccessToken = await this.tokenService.signAccessToken({
      id: user.id,
      role: user.role,
    });

    const userDto = plainToInstance(UserPayloadDto, user, {
      excludeExtraneousValues: true,
    });

    return {
      user: userDto,
      jwtAccessToken,
    };
  }
}
