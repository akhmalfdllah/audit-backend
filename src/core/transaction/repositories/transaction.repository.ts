// src/modules/transaction/repositories/transaction.repository.ts

import { Transaction, TransactionStatus } from "../entities/transaction.entity";

export abstract class TransactionRepository {
    abstract save(transaction: Transaction): Promise<Transaction>
    abstract findById(id: string): Promise<Transaction | null>
    abstract findAll(): Promise<Transaction[]>
    abstract update(trx: Transaction): Promise<Transaction>
    abstract countAll(): Promise<number>
    abstract countByStatus(status: TransactionStatus): Promise<number>
}
