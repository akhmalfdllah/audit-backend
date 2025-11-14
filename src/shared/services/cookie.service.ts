// src/shared/services/cookie.service.ts
import { Injectable } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { CookieOptions } from 'express';
import cookieConfig from 'src/configs/cookie.config';

@Injectable()
export class CookieService {
    getCookieRefreshToken(req: Request): string | undefined {
        const { name } = cookieConfig();
        return req.cookies[name];
    }

    setCookieRefreshToken(res: Response, refreshToken: string): void {
        const config = cookieConfig();

        const options: CookieOptions = {
            secure: config.secure,
            httpOnly: config.httpOnly,
            sameSite: config.sameSite as 'strict' | 'lax' | 'none' | boolean,
            path: config.path,
            partitioned: config.partitioned,
            maxAge: config.maxAge,
        };

        res.cookie(config.name, refreshToken, options);
    }

    clearCookieRefreshToken(res: Response): void {
        const config = cookieConfig();

        const options: CookieOptions = {
            ...config,
            sameSite: config.sameSite as 'strict' | 'lax' | 'none' | boolean, // ⬅️ ini kunci fix-nya
            maxAge: 0,
        };

        res.clearCookie(config.name, options);
    }
}
