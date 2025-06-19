import { AuditLog } from "src/core/audit-log/entities/audit-log.entity";
import { AuditLogORM } from "src/infrastructure/database/typeorm/entities/audit-log.orm-entity";

export class AuditLogMapper {
    static toDomain(orm: AuditLogORM): AuditLog {

        return new AuditLog(
            orm.id,
            orm.actorId,
            orm.action,
            orm.targetEntity,
            orm.targetId,
            orm.metadata ?? null,
            orm.createdAt,
        );
    }

    static toORM(domain: AuditLog): AuditLogORM {
        const orm = new AuditLogORM();
        //orm.id = domain.id;
        orm.actorId = domain.actorId;
        orm.action = domain.action;
        orm.targetEntity = domain.targetEntity;
        orm.targetId = domain.targetId;
        orm.metadata = domain.metadata;
        //orm.createdAt = domain.createdAt;
        return orm;
    }
}