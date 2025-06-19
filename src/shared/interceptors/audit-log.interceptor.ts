import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { Reflector } from "@nestjs/core";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { Request } from "express";

@Injectable()
export class AuditLogInterceptor implements NestInterceptor {
    constructor(
        private readonly auditLogFacade: AuditLogFacade,
        private readonly reflector: Reflector,
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req: Request = context.switchToHttp().getRequest();

        // Ambil metadata custom kalau ada
        const action =
            this.reflector.get<string>('auditAction', context.getHandler()) ??
            `${req.method} ${req.url}`;

        const user = req.user as { id: string } | undefined;

        return next.handle().pipe(
            tap(async () => {
                // Kirim audit log setelah request berhasil
                if (user?.id) {
                    await this.auditLogFacade.create({
                        actorId: user.id,
                        action,
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
