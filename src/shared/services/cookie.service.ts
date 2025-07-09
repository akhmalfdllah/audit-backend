// src/shared/services/cookie.service.ts
import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import cookieConfig from 'src/configs/cookie.config';

@Injectable()
export class CookieService {
    getCookieRefreshToken(req: Request): string | undefined {
        const { name } = cookieConfig();
        return req.cookies[name];
    }

    setCookieRefreshToken(res: Response, refreshToken: string): void {
        const config = cookieConfig();
        res.cookie(config.name, refreshToken, config);
    }
 
    clearCookieRefreshToken(res: Response): void {
        const config = cookieConfig();
        res.clearCookie(config.name, {
            ...config,
            maxAge: 0,
        });
    }
}
