import { Injectable } from "@nestjs/common";
import { UserFacadeService } from "src/interfaces/http/user/user.facade.service";
import { SignInBodyDto } from "src/applications/auth/dto/signin-body.dto";
import { TokenService } from "src/shared/services/token.service";

@Injectable()
export class SignInUseCase {
    constructor(
        private readonly userFacadeService: UserFacadeService,
        private readonly tokenService: TokenService,
    ) { }

    async execute(signInbodyDto: SignInBodyDto) {
        const user = await this.userFacadeService.verifyUser(signInbodyDto);

        const payload = { id: user.id, role: user.role };
        const [jwtAccessToken, jwtRefreshToken] = await Promise.all([
            this.tokenService.signAccessToken(payload),
            this.tokenService.signRefreshToken(payload),
        ]);

        const updated = await this.userFacadeService.updateRefreshToken(user, jwtRefreshToken);

        return { user: updated, jwtAccessToken, jwtRefreshToken };
    }
}
