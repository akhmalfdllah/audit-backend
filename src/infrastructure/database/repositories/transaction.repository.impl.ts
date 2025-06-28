import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionRepository as AbstractTransactionRepo } from 'src/core/transaction/repositories/transaction.repository';
import { Transaction } from 'src/core/transaction/entities/transaction.entity';
import { TransactionORM } from 'src/infrastructure/database/typeorm/entities/transaction.orm-entity';
import { TransactionMapper } from 'src/infrastructure/database/typeorm/mappers/transaction.mapper';

@Injectable()
export class TransactionRepositoryImpl extends AbstractTransactionRepo {
    constructor(
        @InjectRepository(TransactionORM)
        private readonly repo: Repository<TransactionORM>,
    ) {
        super();
    }

    async save(transaction: Transaction): Promise<Transaction> {
        const saved = await this.repo.save(TransactionMapper.toORM(transaction));
        return TransactionMapper.toDomain(saved);
    }

    async findById(id: string): Promise<Transaction | null> {
        const found = await this.repo.findOne({ where: { id } });
        return found ? TransactionMapper.toDomain(found) : null;
    }

    async findAll(): Promise<Transaction[]> {
        const all = await this.repo.find();
        return all.map((t) => TransactionMapper.toDomain(t));
    }

    async update(trx: Transaction): Promise<Transaction> {
        const orm = TransactionMapper.toORM(trx);
        const saved = await this.repo.save(orm); // TypeORM's save() = insert or update
        return TransactionMapper.toDomain(saved);
    }



}
