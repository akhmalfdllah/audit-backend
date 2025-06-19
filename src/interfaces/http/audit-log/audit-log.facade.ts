import { Injectable } from "@nestjs/common";
import { CreateAuditLogUseCase } from "src/applications/audit-log/use-cases/create-audit-log.use-case";
import { GetAuditLogsByTargetUseCase } from "src/applications/audit-log/use-cases/get-audit-logs-by-target.use-case";
import { CreateAuditLogDto } from "src/applications/audit-log/dto/create-audit-log.dto";
import { GetAuditLogsByTargetDto } from "src/applications/audit-log/dto/get-audit-logs-by-target.dto";

@Injectable()
export class AuditLogFacade {
    constructor(
        private readonly createAuditLogUseCase: CreateAuditLogUseCase,
        private readonly getAuditLogsByTargetUseCase: GetAuditLogsByTargetUseCase,
    ) { }

    async create(dto: CreateAuditLogDto) {
        return await this.createAuditLogUseCase.execute(dto);
    }

    async findByTarget(dto: GetAuditLogsByTargetDto) {
        return await this.getAuditLogsByTargetUseCase.execute(dto);
    }
}
