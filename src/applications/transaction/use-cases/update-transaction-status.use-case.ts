import { Injectable } from '@nestjs/common';
import { TransactionRepository } from 'src/core/transaction/repositories/transaction.repository';
import { UpdateTransactionStatusDto } from '../dto/update-transaction-status.dto';
import { AuditLogFacade } from 'src/interfaces/http/audit-log/audit-log.facade';

@Injectable()
export class UpdateTransactionStatusUseCase {
    constructor(
        private readonly transactionRepo: TransactionRepository,
        private readonly auditLogFacade: AuditLogFacade,
    ) { }

    async execute(dto: UpdateTransactionStatusDto, actorId: string) {
        await this.transactionRepo.updateStatus(dto.id, dto.status);

        // Audit log otomatis
        await this.auditLogFacade.create({
            actorId,
            action: `UPDATE_STATUS_${dto.status}`,
            targetEntity: 'Transaction',
            targetId: dto.id,
            metadata: { newStatus: dto.status },
        });
    }
}
