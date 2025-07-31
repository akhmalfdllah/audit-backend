import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';
import { AuditAction } from 'src/core/audit-log/entities/audit-log.entity';

// Zod schema
export const CreateAuditLogZodSchema = z.object({
    actorId: z.string().uuid({ message: 'actorId must be a valid UUID' }),
    action: z.string().min(1, { message: 'action is required' }),
    targetEntity: z.string().min(1, { message: 'targetEntity is required' }),
    targetId: z.string().min(1, { message: 'targetId is required' }),
    metadata: z.record(z.any()).optional(),
    actorName: z.string().optional(),
});

// DTO class for NestJS/Swagger
export class CreateAuditLogDto {
    @ApiProperty()
    actorId: string;

    @ApiProperty()
    actorName: string | null;

    @ApiProperty({ enum: AuditAction })
    action: AuditAction;

    @ApiProperty()
    targetEntity: string;

    @ApiProperty()
    targetId: string;

    @ApiProperty()
    metadata?: Record<string, any>;

    @ApiProperty()
    createdAt?: Date;
}
