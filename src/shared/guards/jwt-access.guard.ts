// src/shared/guards/jwt-access.guard.ts
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAccessName } from 'src/configs/jtw.constant';

@Injectable()
export class JwtAccessGuard extends AuthGuard(JwtAccessName) {
    handleRequest(err, user, info, context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        // Ambil token dari cookie jika user belum dikenali
        if (!user && request.cookies?.access_token) {
            request.headers['authorization'] = `Bearer ${request.cookies.access_token}`;
        }

        console.log('[JwtAccessGuard] Token info:', {
            user,
            err,
            info,
            cookieToken: request.cookies?.access_token,
        });

        if (err) {
            throw err;
        }
        if (!user) {
            throw new UnauthorizedException('Invalid or missing JWT');
        }

        return user;
    }
}
