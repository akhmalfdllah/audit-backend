import { SetMetadata } from '@nestjs/common';

export const AUDIT_ACTION_KEY = 'auditAction';

export const SetAuditAction = (action: string) =>
    SetMetadata(AUDIT_ACTION_KEY, action);
