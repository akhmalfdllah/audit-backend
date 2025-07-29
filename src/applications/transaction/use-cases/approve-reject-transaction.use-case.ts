import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TransactionRepository } from 'src/core/transaction/repositories/transaction.repository';
import { TransactionStatus } from 'src/core/transaction/entities/transaction.entity';

@Injectable()
export class ApproveRejectTransactionUseCase {
    constructor(
        private readonly transactionRepo: TransactionRepository,
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

        return updated;
    }
}
