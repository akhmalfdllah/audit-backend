import { AuditLog } from "src/core/audit-log/entities/audit-log.entity";

export abstract class AuditLogRepository {
    abstract save(log: AuditLog): Promise<AuditLog>;
    abstract findByAction(targetId: string): Promise<AuditLog[]>;
    abstract findByTarget(targetId: string): Promise<AuditLog[]>;
    abstract findPaginated(offset: number, limit: number): Promise<AuditLog[]>;
    
}
