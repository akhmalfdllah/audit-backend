import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from '@nestjs/passport';
import { UserORM } from "src/infrastructure/database/typeorm/entities/user.orm-entity";

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


import { UserFacadeService } from "src/interfaces/http/user/user.facade.service";
import { UserRepositoryImpl } from "src/infrastructure/database/repositories/user.repository.impl";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { UserController } from "src/interfaces/http/user/user.controller";
import { SharedModule } from "src/shared/shared.module";
import { GroupModule } from "../group/group.module";
import { AuditLogModule } from "../audit-log/audit-log.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserORM]),
        SharedModule,
        GroupModule,
        AuditLogModule,
        PassportModule
    ],
    controllers: [UserController],
    providers: [
        UserRepositoryImpl,
        {
            provide: UserRepository,
            useClass: UserRepositoryImpl,
        },
        VerifyUserUseCase,

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
    exports: [UserFacadeService,
        UserRepository,
        VerifyUserUseCase,
        CreateUserUseCase,
        UserRepositoryImpl,
        FindAllUsersUseCase,
        FindOneUserUseCase,
        UpdateUserUseCase,
        SafeUpdateUserUseCase,
        RetrieveGroupUseCase,
        VerifyUserUseCase,
        VerifyUserWithRefreshTokenUseCase,
        SignOutUseCase,
        UpdateRefreshTokenUseCase,
        DeleteUserUseCase,],
})
export class UserModule { }
