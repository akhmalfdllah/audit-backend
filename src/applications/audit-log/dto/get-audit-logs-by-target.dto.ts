import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

// ✅ Zod schema (untuk validasi param)
export const GetAuditLogsByTargetZodSchema = z.object({
    targetId: z.string()
        .uuid({ message: 'targetId must be a valid UUID' }) // 🔍 Lebih ketat jika targetId selalu UUID
        .min(1, { message: 'targetId is required' }),
});

// ✅ DTO class (untuk Swagger + @Param binding)
export class GetAuditLogsByTargetDto {
    @ApiProperty({ example: '25bce9e1-27c3-41b4-8a82-e9d5b5536bdf' })
    targetId: string;
}
