// src/applications/group/group.module.ts

import { Module, forwardRef} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from '@nestjs/passport';
import { GroupORM } from "src/infrastructure/database/typeorm/entities/group.orm-entity";
import { GroupRepositoryImpl } from "src/infrastructure/database/repositories/group.repository.impl";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { GroupController } from "src/interfaces/http/group/group.controller";

// Use cases
import {
    CreateGroupUseCase,
    UpdateGroupUseCase,
    DeleteGroupUseCase,
    FindAllGroupsUseCase,
    FindGroupByIdUseCase
} from "src/applications/group/use-cases/common.use-case";

// Facade
import { GroupFacadeService } from "src/interfaces/http/group/group.facade.service";
import { AuditLogModule } from "../audit-log/audit-log.module";
import { UserModule } from "src/modules/user/user.module";
import { RetrieveGroupUseCase } from "src/applications/user/use-cases/retrieve-group.use-case";

@Module({
    imports: [  
        TypeOrmModule.forFeature([GroupORM]),
        AuditLogModule, 
        PassportModule,
        forwardRef(() => UserModule),],
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
        FindAllGroupsUseCase,
        FindGroupByIdUseCase,
        RetrieveGroupUseCase,

        // Facade
        GroupFacadeService,
    ],
    exports: [GroupRepository, RetrieveGroupUseCase],
})
export class GroupModule { }
