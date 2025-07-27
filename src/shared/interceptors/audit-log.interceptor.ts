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

        // Ambil metadata @AuditAction(...) kalau ada
        const action = this.reflector.get<AuditAction>(
            AUDIT_ACTION_KEY,
            context.getHandler(),
        );

        return next.handle().pipe(
            tap(async () => {
                // Catat audit log HANYA jika ada user login dan ada action valid
                if (user?.id && action) {
                    await this.auditLogFacade.create({
                        actorId: user.id,
                        action: action,
                        targetEntity: req.baseUrl.replace('/', ''),
                        targetId: req.params['id'] ?? req.body?.id ?? 'unknown',
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
