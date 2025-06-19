import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

// Zod schema
export const GetAuditLogsByTargetZodSchema = z.object({
    targetId: z.string().min(1, { message: 'targetId is required' }),
});

// DTO class
export class GetAuditLogsByTargetDto {
    @ApiProperty()
    targetId: string;
}
