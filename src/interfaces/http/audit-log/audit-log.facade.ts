import { Injectable } from "@nestjs/common";
import { CreateAuditLogUseCase } from "src/applications/audit-log/use-cases/create-audit-log.use-case";
import { GetAuditLogsByActionUseCase } from "src/applications/audit-log/use-cases/get-audit-log-by-action.use-case";
import { GetAuditLogsByTargetUseCase } from "src/applications/audit-log/use-cases/get-audit-log-by-target.use-case";
import { CreateAuditLogDto } from "src/applications/audit-log/dto/create-audit-log.dto";
import { AuditLog } from "src/core/audit-log/entities/audit-log.entity";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity";
import { GetPaginatedAuditLogsUseCase } from "src/applications/audit-log/use-cases/get-paginated-audit-logs.usecase";

@Injectable()
export class AuditLogFacade {
    constructor(
        private readonly createAuditLogUseCase: CreateAuditLogUseCase,
        private readonly getAuditLogsByActionUseCase: GetAuditLogsByActionUseCase,
        private readonly getAuditLogsByTargetUseCase: GetAuditLogsByTargetUseCase,
        private readonly getPaginated: GetPaginatedAuditLogsUseCase
    ) { }

    async create(dto: CreateAuditLogDto) {
        return await this.createAuditLogUseCase.execute(dto);
    }

    async findPaginated(offset: number, limit: number) {
        return this.getPaginated.execute(offset, limit);
    }

    async getLogsByTarget(targetId: string): Promise<AuditLog[]> {
        return this.getAuditLogsByTargetUseCase.execute(targetId);
    }

    async findByAction(action: AuditAction) {
        return await this.getAuditLogsByActionUseCase.execute(action);
    }
}