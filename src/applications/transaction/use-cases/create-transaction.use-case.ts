import { Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/core/transaction/repositories/transaction.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { Transaction, TransactionStatus } from 'src/core/transaction/entities/transaction.entity';

@Injectable()
export class CreateTransactionUseCase {
    constructor(private readonly transactionRepo: TransactionRepository) { }

    async execute(dto: CreateTransactionDto): Promise<Transaction> {
        const transaction = new Transaction(
            null,
            dto.title,
            dto.amount,
            dto.submittedBy,
            TransactionStatus.PENDING,
            new Date(),
            new Date(),
        );
        return await this.transactionRepo.save(transaction);
    }
}
