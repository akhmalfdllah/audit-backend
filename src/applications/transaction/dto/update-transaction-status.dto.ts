import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { TransactionStatus } from 'src/core/transaction/entities/transaction.entity';

export const UpdateTransactionStatusSchema = z.object({
    id: z.string().uuid(),
    status: z.nativeEnum(TransactionStatus),
});


export class UpdateTransactionStatusDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    status: TransactionStatus;
}
