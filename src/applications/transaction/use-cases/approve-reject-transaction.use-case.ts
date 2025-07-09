import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TransactionRepository } from 'src/core/transaction/repositories/transaction.repository';
import { AuditAction } from 'src/core/audit-log/entities/audit-log.entity';
import { AuditLogFacade } from 'src/interfaces/http/audit-log/audit-log.facade';
import { TransactionStatus } from 'src/core/transaction/entities/transaction.entity';

@Injectable()
export class ApproveRejectTransactionUseCase {
    constructor(
        private readonly transactionRepo: TransactionRepository,
        private readonly auditLogUseCase: AuditLogFacade,
    ) { }

    async execute(
        id: string,
        decision: Exclude<TransactionStatus, 'PENDING'>,
        actorId: string,
    ) {
        const trx = await this.transactionRepo.findById(id);
        if (!trx) throw new NotFoundException('Transaction not found');

        if (trx.status !== 'PENDING') {
            throw new BadRequestException('Transaction already reviewed');
        }

        trx.status = decision;
        trx.approvedBy = actorId;

        const updated = await this.transactionRepo.update(trx);

        await this.auditLogUseCase.create({
            actorId,
            action:
                decision === 'APPROVED'
                    ? AuditAction.APPROVE_TRANSACTION
                    : AuditAction.REJECT_TRANSACTION,
            targetEntity: 'Transaction',
            targetId: trx.id,
            metadata: {
                title: trx.title,
                amount: trx.amount,
            },
        });

        return updated;
    }
}
