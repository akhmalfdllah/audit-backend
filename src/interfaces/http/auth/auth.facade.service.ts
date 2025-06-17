import { Injectable } from "@nestjs/common";
import { SignUpUseCase } from "src/applications/auth/use-cases/sign-up.use-case";
import { SignInUseCase } from "src/applications/auth/use-cases/sign-in.use-case";
import { RefreshTokenUseCase } from "src/applications/auth/use-cases/refresh-token.use-case";
import { SignOutUseCase } from "src/applications/auth/use-cases/sign-out.use-case";
import { SignUpBodyDto } from "../../../applications/auth/dto/signup-body.dto";
import { SignInBodyDto } from "../../../applications/auth/dto/signin-body.dto";

@Injectable()
export class AuthFacadeService {
    constructor(
        private readonly signUpUseCase: SignUpUseCase,
        private readonly signInUseCase: SignInUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
        private readonly signOutUseCase: SignOutUseCase,
    ) { }

    async signUp(dto: SignUpBodyDto) {
        return this.signUpUseCase.execute(dto);
    }

    async signIn(dto: SignInBodyDto) {
        return this.signInUseCase.execute(dto);
    }

    async newAccessToken(userId: string, refreshToken: string) {
        return this.refreshTokenUseCase.execute(userId, refreshToken);
    }

    async signOut(userId: string, refreshToken: string) {
        return this.signOutUseCase.execute(userId, refreshToken);
    }
}
