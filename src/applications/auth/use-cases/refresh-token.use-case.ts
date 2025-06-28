import { Injectable } from "@nestjs/common";
import { UserFacadeService } from "src/interfaces/http/user/user.facade.service";
import { TokenService } from "src/shared/services/token.service";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { plainToInstance } from "class-transformer";

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly userFacadeService: UserFacadeService,
    private readonly tokenService: TokenService,
  ) { }

  async execute(userId: string, refreshToken: string) {
    // 1. Verifikasi user dan refresh token (hash match)
    const user = await this.userFacadeService.verifyUserWithRefreshToken(userId, refreshToken);

    // 2. Buat JWT access token baru
    const jwtAccessToken = await this.tokenService.signAccessToken({
      id: user.id,
      role: user.role,
    });

    // 3. Transform user ke DTO aman
    const userDto = plainToInstance(UserPayloadDto, user, {
      excludeExtraneousValues: true,
    });

    // 4. Return access token dan user
    return {
      user: userDto,
      jwtAccessToken,
    };
  }
}
