import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLogRepository as AbstractAuditLogRepo } from 'src/core/audit-log/repositories/audit-log.repository';
import { AuditLog } from 'src/core/audit-log/entities/audit-log.entity';
import { AuditLogORM } from 'src/infrastructure/database/typeorm/entities/audit-log.orm-entity';
import { AuditLogMapper } from 'src/infrastructure/database/typeorm/mappers/audit-log.mapper';
import { AuditAction } from 'src/core/audit-log/entities/audit-log.entity';

@Injectable()
export class AuditLogRepositoryImpl implements AbstractAuditLogRepo {
    constructor(
        @InjectRepository(AuditLogORM)
        private readonly repo: Repository<AuditLogORM>,
    ) { }

    async save(log: AuditLog): Promise<AuditLog> {
        const ormEntity = AuditLogMapper.toORM(log);
        const saved = await this.repo.save(ormEntity);
        return AuditLogMapper.toDomain(saved);
    }

    async findByAction(action: AuditAction): Promise<AuditLog[]> {
        const found = await this.repo.find({ where: { action } });
        return found.map((orm) => AuditLogMapper.toDomain(orm));
    }

    async findByTarget(targetId: string): Promise<AuditLog[]> {
        const found = await this.repo.find({ where: { targetId } });
        return found.map((orm) => AuditLogMapper.toDomain(orm));
    }


}