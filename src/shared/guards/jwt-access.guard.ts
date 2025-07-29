// src/shared/guards/jwt-access.guard.ts
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAccessName } from 'src/configs/jtw.constant';

@Injectable()
export class JwtAccessGuard extends AuthGuard(JwtAccessName) {
    handleRequest(err, user, info, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        console.log('[JwtAccessGuard] Token info:', {
            user,
            err,
            info,
            authHeader: request.headers['authorization'],
        });

        if (err || !user) {
            throw err || new UnauthorizedException('Invalid or missing JWT');
        }

        return user;
    }
}
