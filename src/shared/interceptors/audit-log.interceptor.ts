import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuditLogFacade } from 'src/interfaces/http/audit-log/audit-log.facade';
import { AUDIT_ACTION_KEY } from 'src/shared/decorators/audit-action.decorator';
import { AuditAction } from 'src/core/audit-log/entities/audit-log.entity';

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
    constructor(
        private readonly auditLogFacade: AuditLogFacade,
        private readonly reflector: Reflector,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req: Request = context.switchToHttp().getRequest();
        const user = req.user as { id: string } | undefined;

        const method = req.method;
        const url = req.originalUrl;

        let action: AuditAction | undefined = this.reflector.get<AuditAction>(
            AUDIT_ACTION_KEY,
            context.getHandler(),
        );

        // 🧠 Tambahan log bantu debug
        console.log('[AuditLogInterceptor] method:', method);
        console.log('[AuditLogInterceptor] url:', url);

        // Deteksi otomatis untuk transaksi
        if (!action && method === 'POST' && url.includes('/transactions/from-erp')) {
            action = AuditAction.CREATE_TRANSACTION;
        }

        if (!action && method === 'POST' && url.includes('/transactions')) {
            action = AuditAction.CREATE_TRANSACTION;
        }

        if (!action && method === 'PUT' && url.includes('/transactions')) {
            const decision = req.body?.decision;
            if (decision === 'APPROVED') {
                action = AuditAction.APPROVE_TRANSACTION;
            } else if (decision === 'REJECTED') {
                action = AuditAction.REJECT_TRANSACTION;
            }
        }

        const targetEntity = url.split('/')[1] ?? 'unknown';
        const targetId = req.params['id'] ?? req.body?.id ?? 'unknown';

        return next.handle().pipe(
            tap(async () => {
                if (!user?.id || !action) {
                    console.log('[AuditLogInterceptor] ❌ Audit log tidak dicatat karena actorId/action tidak tersedia');
                    return;
                }

                console.log('[AuditLogInterceptor] ✅ Mencatat audit log:', {
                    actorId: user.id,
                    action,
                    targetEntity,
                    targetId,
                });

                await this.auditLogFacade.create({
                    actorId: user.id,
                    action,
                    targetEntity,
                    targetId,
                    metadata: {
                        body: req.body,
                        query: req.query,
                        params: req.params,
                    },
                });
            }),
        );
    }

}