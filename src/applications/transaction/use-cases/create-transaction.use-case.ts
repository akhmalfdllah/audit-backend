import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/core/transaction/entities/transaction.entity';
import { TransactionRepository } from 'src/core/transaction/repositories/transaction.repository';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { CreateAuditLogUseCase } from 'src/applications/audit-log/use-cases/create-audit-log.use-case';
import { AuditAction } from 'src/core/audit-log/entities/audit-log.entity';
import { TransactionStatus } from 'src/core/transaction/entities/transaction.entity';

@Injectable()
export class CreateTransactionUseCase {
    constructor(
        private readonly transactionRepo: TransactionRepository,
        private readonly auditLogUseCase: CreateAuditLogUseCase,
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

        await this.auditLogUseCase.execute({
            actorId: actorId, // tetap pencatat log adalah yang kirim
            action: AuditAction.CREATE_TRANSACTION,
            targetEntity: 'Transaction',
            targetId: saved.id,
            metadata: {
                title: transaction.title,
                amount: transaction.amount,
                category: transaction.category,
            },
        });

        return saved;
    }
}
