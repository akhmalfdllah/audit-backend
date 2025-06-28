import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

// ✅ ZOD Schema
export const CreateTransactionZodSchema = z.object({
    title: z.string().min(3, 'title is required'),
    amount: z.number().positive('amount must be > 0'),
    category: z.string().min(1, 'category is required'),
    description: z.string().optional(),
    submittedBy: z.string().uuid().optional(), // dipakai jika ERP kirim data
});

// ✅ DTO Class untuk Swagger
export class CreateTransactionDto {
    @ApiProperty({ example: 'Pembayaran Vendor A' })
    title: string;

    @ApiProperty({ example: 1500000 })
    amount: number;

    @ApiProperty({ example: 'Pembelian' })
    category: string;

    @ApiProperty({ example: 'Tagihan #123', required: false })
    description?: string;

    @ApiProperty({ example: 'user-uuid', required: false })
    submittedBy?: string; // otomatis isi dari user jika tidak dikirim
}
