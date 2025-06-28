import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TableName } from 'src/configs/database.config';
import { AuditAction } from 'src/core/audit-log/entities/audit-log.entity';

@Entity({ name: TableName.AuditLog })
export class AuditLogORM {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @ApiProperty({ example: 'user-uuid' })
    actorId: string;

    @Column({ type: 'enum', enum: AuditAction })
    @ApiProperty({ enum: AuditAction })
    action: AuditAction;

    @Column()
    @ApiProperty({ example: 'User' })
    targetEntity: string;

    @Column()
    @ApiProperty({ example: 'target-id-uuid' })
    targetId: string;

    @Column({ type: 'jsonb', nullable: true })
    @ApiProperty({ required: false, type: Object })
    metadata?: Record<string, any> | null;

    @CreateDateColumn()
    @ApiProperty()
    createdAt: Date;
}
