import { Injectable } from "@nestjs/common";
import {
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindOneUserUseCase,
    UpdateUserUseCase,
    SafeUpdateUserUseCase,
    DeleteUserUseCase,
    VerifyUserUseCase,
    VerifyUserWithRefreshTokenUseCase,
    SignOutUseCase,
    UpdateRefreshTokenUseCase,
    RetrieveGroupUseCase
} from "src/applications/user/use-cases/common.use-case";

import {
    CreateUserBodyDto,
    SafeUpdateBodyDto,
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
        private readonly safeUpdateUserUseCase: SafeUpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly verifyUserUseCase: VerifyUserUseCase,
        private readonly verifyUserWithRefreshTokenUseCase: VerifyUserWithRefreshTokenUseCase,
        private readonly signOutUseCase: SignOutUseCase,
        private readonly updateRefreshTokenUseCase: UpdateRefreshTokenUseCase,
        private readonly retrieveGroupUseCase: RetrieveGroupUseCase,
    ) { }

    create(dto: CreateUserBodyDto) {
        return this.createUserUseCase.execute(dto);
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

    async safeUpdate(id: string, dto: SafeUpdateBodyDto, actorId: string) {
        return this.safeUpdateUserUseCase.execute(id, dto, actorId);
    }


    async delete(id: string, actorId: string): Promise<void> {
        return this.deleteUserUseCase.execute(id, actorId);
    }


    verifyUser(dto: VerifyUserBodyDto) {
        return this.verifyUserUseCase.execute(dto);
    }

    verifyUserWithRefreshToken(id: string, refreshToken: string) {
        return this.verifyUserWithRefreshTokenUseCase.execute(id, refreshToken);
    }

    signOut(id: string, refreshToken: string) {
        return this.signOutUseCase.execute(id, refreshToken);
    }

    updateRefreshToken(user: UserPayloadDto, refreshToken: string) {
        return this.updateRefreshTokenUseCase.execute(user.id, refreshToken);
    }

    retrieveGroup(userId: string) {
        return this.retrieveGroupUseCase.execute(userId);
    }
}
