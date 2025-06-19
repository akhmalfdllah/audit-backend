import { SetMetadata } from '@nestjs/common';

export const AuditAction = (action: string) => SetMetadata('auditAction', action);
