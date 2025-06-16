import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserORM } from "src/infrastructure/database/typeorm/entities/user.orm-entity";
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
import { UserRepository } from "src/core/user/repositories/user.repository";

@Module({
    imports: [TypeOrmModule.forFeature([UserORM])],
    providers: [
        {
            provide: UserRepository,
            useClass: UserRepositoryImpl,
        },

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
    exports: [UserFacadeService, UserRepository],
})
export class UserModule { }
