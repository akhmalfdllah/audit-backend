import { Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/core/transaction/repositories/transaction.repository';
import { Transaction } from 'src/core/transaction/entities/transaction.entity';

@Injectable()
export class GetAllTransactionsUseCase {
    constructor(private readonly transactionRepo: TransactionRepository) { }

    async execute(): Promise<Transaction[]> {
        return this.transactionRepo.findAll();
    }
}
