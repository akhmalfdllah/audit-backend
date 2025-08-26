import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/core/transaction/entities/transaction.entity';
import { TransactionRepository } from 'src/core/transaction/repositories/transaction.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionStatus } from 'src/core/transaction/entities/transaction.entity';

@Injectable()
export class CreateTransactionUseCase {
    constructor(
        private readonly transactionRepo: TransactionRepository,
    ) { }

    async execute(dto: CreateTransactionDto, actorId: string): Promise<Transaction> {
        const transaction = new Transaction(
            null,
            dto.title,
            dto.amount,
            dto.category,
            dto.description ?? null,
            TransactionStatus.PENDING,
            dto.submittedBy ?? actorId, // ← dari token atau ERP
            null,
            null,
            null
        );

        const saved = await this.transactionRepo.save(transaction);

        return saved;
    }
}
