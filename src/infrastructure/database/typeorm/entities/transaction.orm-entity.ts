import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { TransactionStatus } from 'src/core/transaction/entities/transaction.entity';
import { TableName } from 'src/configs/database.config';

@Entity({ name: TableName.Transaction })
export class TransactionORM {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column('decimal')
    amount: number;

    @Column()
    submittedBy: string;

    @Column({ type: 'enum', enum: TransactionStatus, default: TransactionStatus.PENDING })
    status: TransactionStatus;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}