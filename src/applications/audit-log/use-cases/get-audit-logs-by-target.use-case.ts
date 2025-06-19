import { Injectable } from '@nestjs/common';
import { GetAuditLogsByTargetDto } from '../dto/get-audit-logs-by-target.dto';
import { AuditLog } from 'src/core/audit-log/entities/audit-log.entity';
import { AuditLogRepository } from 'src/core/audit-log/repositories/audit-log.repository';

@Injectable()
export class GetAuditLogsByTargetUseCase {
    constructor(private readonly auditLogRepo: AuditLogRepository) { }

    async execute(dto: GetAuditLogsByTargetDto): Promise<AuditLog[]> {
        return await this.auditLogRepo.findByTarget(dto.targetId);
    }
}
