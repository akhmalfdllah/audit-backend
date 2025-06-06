import { Injectable } from "@nestjs/common";
import type { Request, Response } from "express";
import { JwtRefreshCookieName, JwtRefreshCookieOptions } from "src/configs/cookie.config";

@Injectable()
export class CookieService {
    getCookieRefreshToken(req: Request) {
        return req.cookies[JwtRefreshCookieName];
    }

    setCookieRefreshToken(res: Response, refreshToken: string): void {
        res.cookie(JwtRefreshCookieName, refreshToken, JwtRefreshCookieOptions);
        return;
    }

    clearCookieRefreshToken(res: Response): void {
        res.clearCookie(JwtRefreshCookieName);
        return;
    }
}
