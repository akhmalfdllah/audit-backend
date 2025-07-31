import { Injectable } from "@nestjs/common";
import { AuditLogRepository } from "src/core/audit-log/repositories/audit-log.repository";

@Injectable()
export class GetPaginatedAuditLogsUseCase {
    constructor(private readonly auditLogRepo: AuditLogRepository) { }

    async execute(offset: number, limit: number) {
        return this.auditLogRepo.findPaginated(offset, limit);
    }
}
