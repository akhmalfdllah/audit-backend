import { Injectable } from "@nestjs/common";
import { SignInUseCase } from "src/applications/auth/use-cases/sign-in.use-case";
import { RefreshTokenUseCase } from "src/applications/auth/use-cases/refresh-token.use-case";
import { SignOutUseCase } from "src/applications/auth/use-cases/sign-out.use-case";
import { SignInBodyDto } from "../../../applications/auth/dto/signin-body.dto";
import { CreateUserBodyDto } from "src/applications/user/dto/create-user-body.dto";
import { CreateUserUseCase } from "src/applications/user/use-cases/create-user.use-case";

@Injectable()
export class AuthFacadeService {
    constructor(
        private readonly signInUseCase: SignInUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
        private readonly signOutUseCase: SignOutUseCase,
        private readonly createUserUseCase: CreateUserUseCase,
    ) { }

    async signUp(dto: CreateUserBodyDto) {
        return this.createUserUseCase.execute(dto);
    }

    async signIn(dto: SignInBodyDto) {
        return this.signInUseCase.execute(dto);
    }

    async newAccessToken(userId: string, refreshToken: string) {
        return this.refreshTokenUseCase.execute(userId, { refreshToken });
    }

    async signOut(userId: string, refreshToken: string) {
        return this.signOutUseCase.execute(userId, refreshToken);
    }
}
