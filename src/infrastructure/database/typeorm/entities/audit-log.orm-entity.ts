import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { TableName } from "src/configs/database.config";
@Entity({ name: TableName.AuditLog })
export class AuditLogORM {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    actorId: string; // ID user yang melakukan aksi

    @Column()
    action: string; // contoh: 'CREATE', 'UPDATE', 'DELETE', 'REVIEW', etc.

    @Column()
    targetEntity: string; // contoh: 'Transaction', 'User'

    @Column()
    targetId: string; // contoh: id transaksi yang dimodifikasi

    @Column({ type: 'jsonb', nullable: true })
    @ApiProperty({ required: false, type: Object })
    metadata?: Record<string, any> | null; // detail tambahan

    @CreateDateColumn()
    createdAt: Date;
}
