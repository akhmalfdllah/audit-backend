import { Transaction } from '../entities/transaction.entity';

export abstract class TransactionRepository {
    abstract save(transaction: Transaction): Promise<Transaction>;
    abstract findById(id: string): Promise<Transaction | null>;
    abstract findAllByUser(userId: string): Promise<Transaction[]>;
    abstract updateStatus(id: string, status: string): Promise<void>;
}
