import { Module } from "@nestjs/common";
import { UserController } from "src/interfaces/http/user/user.controller";
import { UserRepositoryImpl } from "src/infrastructure/database/repositories/user.repository.impl";
import { GroupRepositoryImpl } from "src/infrastructure/database/repositories/group.repository.impl";

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

import { ArgonService } from "src/shared/services/argon.service";
import { UserFacadeService } from "src/applications/user/user.facade.service";

@Module({
    controllers: [UserController],
    providers: [UserRepositoryImpl, GroupRepositoryImpl, ArgonService,

        CreateUserUseCase,
        FindAllUsersUseCase,
        FindOneUserUseCase,
        UpdateUserUseCase,
        SafeUpdateUserUseCase,
        RetrieveGroupUseCase,
        VerifyUserUseCase,
        VerifyUserWithRefreshTokenUseCase,
        SignOutUseCase,
        UpdateRefreshTokenUseCase,
        DeleteUserUseCase,

        UserFacadeService,
    ],
    exports: [UserFacadeService],
})
export class UserModule { }
