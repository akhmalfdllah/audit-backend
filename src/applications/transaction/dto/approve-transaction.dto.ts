import { ApiProperty } from '@nestjs/swagger';
import { z } from 'zod';
import { TransactionStatus } from 'src/core/transaction/entities/transaction.entity';

export const ApproveTransactionZodSchema = z.object({
    decision: z.nativeEnum(TransactionStatus).refine(
        (v) => v === TransactionStatus.APPROVED || v === TransactionStatus.REJECTED,
        { message: 'decision must be APPROVED or REJECTED' }
    ),
});

export class ApproveTransactionDto {
    @ApiProperty({ enum: [TransactionStatus.APPROVED, TransactionStatus.REJECTED] })
    decision: TransactionStatus.APPROVED | TransactionStatus.REJECTED;
}

