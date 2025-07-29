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

        return next.handle().pipe(
            tap(async () => {
                if (!user?.id) return;

                const url = req.baseUrl.replace('/', ''); // Misalnya: "transactions"
                const targetId = req.params['id'] ?? req.body?.id ?? 'unknown';

                // Ambil metadata @AuditAction(...) jika ada
                let action = this.reflector.get<AuditAction>(
                    AUDIT_ACTION_KEY,
                    context.getHandler(),
                );

                // ⬇️ Kalau belum ada, cek body.decision untuk put /approval
                if (!action) {
                    const isApprovalEndpoint =
                        req.method === 'PUT' &&
                        /\/[^\/]+\/approval$/.test(req.originalUrl); // cocokkan format :id/approval

                    if (isApprovalEndpoint) {
                        const decision = req.body?.decision;
                        if (decision === 'APPROVED') {
                            action = AuditAction.APPROVE_TRANSACTION;
                        } else if (decision === 'REJECTED') {
                            action = AuditAction.REJECT_TRANSACTION;
                        }
                    }
                }

                // Lanjut buat audit log kalau action terdeteksi
                if (action) {
                    await this.auditLogFacade.create({
                        actorId: user.id,
                        action,
                        targetEntity: url,
                        targetId,
                        metadata: {
                            body: req.body,
                            query: req.query,
                            params: req.params,
                        },
                    });
                }
            }),
        );
    }
}
