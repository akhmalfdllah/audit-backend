// src/applications/group/group.module.ts

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupORM } from "src/infrastructure/database/typeorm/entities/group.orm-entity";
import { GroupRepositoryImpl } from "src/infrastructure/database/repositories/group.repository.impl";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { GroupController } from "src/interfaces/http/group/group.controller";

// Use cases
import {
    CreateGroupUseCase,
    UpdateGroupUseCase,
    DeleteGroupUseCase,
    FindAllGroupUseCase,
    FindOneGroupUseCase
} from "src/applications/group/use-cases/common.use-case";

// Facade
import { GroupFacade } from "src/applications/group/group.facade.service";

@Module({
    imports: [TypeOrmModule.forFeature([GroupORM])],
    controllers: [GroupController],
    providers: [
        // Repository binding
        {
            provide: GroupRepository,
            useClass: GroupRepositoryImpl,
        },

        // Use cases
        CreateGroupUseCase,
        UpdateGroupUseCase,
        DeleteGroupUseCase,
        FindAllGroupUseCase,
        FindOneGroupUseCase,

        // Facade
        GroupFacade,
    ],
    exports: [GroupFacade],
})
export class GroupModule { }
