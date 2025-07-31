import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuditLogORM } from "src/infrastructure/database/typeorm/entities/audit-log.orm-entity";
import { AuditLogController } from "src/interfaces/http/audit-log/audit-log.controller";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { CreateAuditLogUseCase } from "src/applications/audit-log/use-cases/create-audit-log.use-case";
import { GetAuditLogsByActionUseCase } from "src/applications/audit-log/use-cases/get-audit-log-by-action.use-case";
import { AuditLogRepositoryImpl } from "src/infrastructure/database/repositories/audit-log.repository.impl";
import { AuditLogRepository } from "src/core/audit-log/repositories/audit-log.repository";
import { AuditLogMapper } from "src/infrastructure/database/typeorm/mappers/audit-log.mapper";
import { GetAuditLogsByTargetUseCase } from "src/applications/audit-log/use-cases/get-audit-log-by-target.use-case";
import { GetPaginatedAuditLogsUseCase } from "src/applications/audit-log/use-cases/get-paginated-audit-logs.usecase";

@Module({
    imports: [TypeOrmModule.forFeature([AuditLogORM]),],
    controllers: [AuditLogController],
    providers: [
        GetPaginatedAuditLogsUseCase,
        {
            provide: AuditLogRepository,
            useClass: AuditLogRepositoryImpl,
        },
        AuditLogFacade,
        AuditLogMapper,
        CreateAuditLogUseCase,
        GetAuditLogsByActionUseCase,
        GetAuditLogsByTargetUseCase,
        AuditLogFacade,
    ],
    exports: [AuditLogFacade],
})
export class AuditLogModule { }
