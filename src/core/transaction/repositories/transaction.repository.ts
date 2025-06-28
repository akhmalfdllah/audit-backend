import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionRepository {
    abstract save(transaction: Transaction): Promise<Transaction>;
    abstract findById(id: string): Promise<Transaction | null>;
    abstract findAll(): Promise<Transaction[]>;
    abstract update(trx: Transaction): Promise<Transaction>;
}
