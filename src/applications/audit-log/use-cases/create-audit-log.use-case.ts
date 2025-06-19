import { Injectable } from "@nestjs/common";
import { CreateAuditLogDto } from "../dto/create-audit-log.dto";
import { AuditLog } from "src/core/audit-log/entities/audit-log.entity";
import { AuditLogRepository } from "src/core/audit-log/repositories/audit-log.repository";

@Injectable()
export class CreateAuditLogUseCase {
    constructor(private readonly auditLogRepo: AuditLogRepository) { }

    async execute(dto: CreateAuditLogDto): Promise<AuditLog> {
        const log = new AuditLog(
            null, // ID akan di-generate oleh database
            dto.actorId,
            dto.action,
            dto.targetEntity,
            dto.targetId,
            dto.metadata ?? null,
            null // createdAt juga akan ditangani oleh DB
        );

        return await this.auditLogRepo.save(log);
    }
}
