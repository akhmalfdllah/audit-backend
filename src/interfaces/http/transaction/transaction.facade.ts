import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from 'src/applications/transaction/dto/create-transaction.dto';
import { CreateTransactionUseCase } from 'src/applications/transaction/use-cases/create-transaction.use-case';
import { Transaction } from 'src/core/transaction/entities/transaction.entity';
import { GetAllTransactionsUseCase } from 'src/applications/transaction/use-cases/get-all-transactions.use-case';
import { ApproveRejectTransactionUseCase } from 'src/applications/transaction/use-cases/approve-reject-transaction.use-case';
import { TransactionStatus } from 'src/core/transaction/entities/transaction.entity';

@Injectable()
export class TransactionFacade {
    constructor(
        private readonly createTransactionUseCase: CreateTransactionUseCase,
        private readonly getAllTransactionsUseCase: GetAllTransactionsUseCase,
        private readonly approveRejectTransactionUseCase: ApproveRejectTransactionUseCase
    ) { }

    async create(dto: CreateTransactionDto, actorId: string): Promise<Transaction> {
        return this.createTransactionUseCase.execute(dto, actorId);
    }

    async findAll() {
        return this.getAllTransactionsUseCase.execute();
    }
    async approveReject(id: string, decision: TransactionStatus.APPROVED | TransactionStatus.REJECTED, actorId: string) {
        return this.approveRejectTransactionUseCase.execute(id, decision, actorId);
    }
}
