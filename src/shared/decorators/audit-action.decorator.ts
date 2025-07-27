// src/shared/decorators/audit-action.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { AuditAction } from 'src/core/audit-log/entities/audit-log.entity';

export const AUDIT_ACTION_KEY = 'audit_action';
export const AuditActionDecorator = (action: AuditAction) =>
    SetMetadata(AUDIT_ACTION_KEY, action);
