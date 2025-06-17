import { Injectable } from "@nestjs/common";
import { UserFacadeService } from "src/interfaces/http/user/user.facade.service";
import { TokenService } from "src/shared/services/token.service";

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly userfaceService: UserFacadeService,
    private readonly tokenService: TokenService,
  ) {}

  async execute(userId: string, refreshToken: string) {
    const user = await this.userfaceService.verifyUserWithRefreshToken(userId, refreshToken);
    const jwtAccessToken = await this.tokenService.signAccessToken({
      id: user.id,
      role: user.role,
    });
    return { user, jwtAccessToken };
  }
}
