import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuditLogORM } from "src/infrastructure/database/typeorm/entities/audit-log.orm-entity";
import { AuditLogController } from "src/interfaces/http/audit-log/audit-log.controller";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { CreateAuditLogUseCase } from "src/applications/audit-log/use-cases/create-audit-log.use-case";
import { GetAuditLogsByTargetUseCase } from "src/applications/audit-log/use-cases/get-audit-logs-by-target.use-case";
import { AuditLogRepositoryImpl } from "src/infrastructure/database/repositories/audit-log.repository.impl";
import { AuditLogRepository } from "src/core/audit-log/repositories/audit-log.repository";

@Module({
    imports: [TypeOrmModule.forFeature([AuditLogORM])],
    controllers: [AuditLogController],
    providers: [
        AuditLogFacade,
        CreateAuditLogUseCase,
        GetAuditLogsByTargetUseCase,
        {
            provide: AuditLogRepository,
            useClass: AuditLogRepositoryImpl,
        },
    ],
    exports: [AuditLogFacade],
})
export class AuditLogModule { }
