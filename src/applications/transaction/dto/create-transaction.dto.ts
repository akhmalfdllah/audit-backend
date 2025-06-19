import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

export const CreateTransactionSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    amount: z.number().positive('Amount must be positive'),
    submittedBy: z.string().uuid(),
});

export class CreateTransactionDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    submittedBy: string;
}
