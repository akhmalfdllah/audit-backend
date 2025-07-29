import { Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/core/transaction/repositories/transaction.repository';
import { Transaction } from 'src/core/transaction/entities/transaction.entity';

@Injectable()
export class GetAllTransactionsUseCase {
    constructor(private readonly transactionRepo: TransactionRepository) { }

    async execute(): Promise<Transaction[]> {
        console.log('[GetAllTransactionsUseCase] execute() dipanggil');
        const result = await this.transactionRepo.findAll();
        console.log('[FindAllTransactionsUseCase] Jumlah transaksi:', result.length);
        return this.transactionRepo.findAll();
    }
}
