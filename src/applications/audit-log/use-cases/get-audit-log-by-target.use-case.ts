import { Injectable } from '@nestjs/common';
import { AuditLog } from 'src/core/audit-log/entities/audit-log.entity';
import { AuditLogRepository } from 'src/core/audit-log/repositories/audit-log.repository';

@Injectable()
export class GetAuditLogsByTargetUseCase {
  constructor(private readonly auditLogRepo: AuditLogRepository) {}

  async execute(targetId: string): Promise<AuditLog[]> {
    return this.auditLogRepo.findByTarget(targetId);
  }
}
