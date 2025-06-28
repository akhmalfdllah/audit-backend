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

    @Column('numeric')
    amount: number;

    @Column()
    category: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: 'PENDING' })
    status: TransactionStatus;

    @Column()
    submittedBy: string;

    @Column({ nullable: true })
    approvedBy: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}