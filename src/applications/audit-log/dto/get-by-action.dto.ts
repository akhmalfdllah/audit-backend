import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { AuditAction } from 'src/core/audit-log/entities/audit-log.entity';

export const GetAuditLogsByActionSchema = z.object({
    action: z.nativeEnum(AuditAction, { message: 'Invalid action' }),
});

export class GetAuditLogsByActionDto {
    @ApiProperty({ enum: AuditAction })
    action: AuditAction;
}