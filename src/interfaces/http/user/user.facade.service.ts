import { Injectable } from "@nestjs/common";
import {
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindOneUserUseCase,
    UpdateUserUseCase,
    ChangePasswordUseCase,
    DeleteUserUseCase,
    VerifyUserUseCase,
    VerifyUserWithRefreshTokenUseCase,
    SignOutUseCase,
    UpdateRefreshTokenUseCase,
    RetrieveGroupUseCase
} from "src/applications/user/use-cases/common.use-case";

import {
    CreateUserInput,
    ChangePasswordDto,
    SearchUserQueryTransformed,
    UpdateUserBodyTransformed,
    VerifyUserBodyDto,
    UserPayloadDto,
} from "src/applications/user/dto/common.dto";

@Injectable()
export class UserFacadeService {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findAllUsersUseCase: FindAllUsersUseCase,
        private readonly findOneUserUseCase: FindOneUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly changePasswordUseCase: ChangePasswordUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly verifyUserUseCase: VerifyUserUseCase,
        private readonly verifyUserWithRefreshTokenUseCase: VerifyUserWithRefreshTokenUseCase,
        private readonly signOutUseCase: SignOutUseCase,
        private readonly updateRefreshTokenUseCase: UpdateRefreshTokenUseCase,
        private readonly retrieveGroupUseCase: RetrieveGroupUseCase,
    ) { }

    create(input: CreateUserInput): Promise<UserPayloadDto> {
        return this.createUserUseCase.execute(input);
    }

    findAll(query: SearchUserQueryTransformed) {
        return this.findAllUsersUseCase.execute(query);
    }

    findOne(id: string) {
        return this.findOneUserUseCase.execute(id);
    }

    update(id: string, dto: UpdateUserBodyTransformed) {
        return this.updateUserUseCase.execute(id, dto);
    }

    async changePassword(userId: string, currentPassword: string, newPassword: string, confirmPassword: string) {
        console.log(currentPassword, newPassword, confirmPassword);
    return this.changePasswordUseCase.execute(userId, currentPassword, newPassword, confirmPassword);
  }

    async delete(id: string): Promise<void> {
        return this.deleteUserUseCase.execute(id);
    }

    verifyUser(dto: VerifyUserBodyDto) {
        return this.verifyUserUseCase.execute(dto);
    }

    verifyUserWithRefreshToken(id: string, refreshToken: string) {
        return this.verifyUserWithRefreshTokenUseCase.execute(id, refreshToken);
    }

    async signOut(userId: string, { refreshToken }: { refreshToken: string }) {
        return this.signOutUseCase.execute(userId, refreshToken);
    }

    // Di dalam UserFacadeService
    async updateHashedRefreshToken(userId: string, { refreshToken }: { refreshToken: string | null }) {
        if (!refreshToken) {
            console.warn('⚠️ Refresh token is null or undefined. Skipping update.');
            return;
        }
        console.log('🛠️ Updating hashed refresh token for user:', userId);
        const result = await this.updateRefreshTokenUseCase.execute(userId, refreshToken);
        console.log('📦 Update result:', result);
    }

    retrieveGroup(userId: string) {
        return this.retrieveGroupUseCase.execute(userId);
    }
}