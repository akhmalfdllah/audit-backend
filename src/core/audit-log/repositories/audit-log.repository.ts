import { AuditLog } from "src/core/audit-log/entities/audit-log.entity";

export abstract class AuditLogRepository {
    abstract save(log: AuditLog): Promise<AuditLog>;
    abstract findByTarget(targetId: string): Promise<AuditLog[]>;
}
