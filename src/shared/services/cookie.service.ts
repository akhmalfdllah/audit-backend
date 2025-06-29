import { Injectable } from "@nestjs/common";
import type { Request, Response } from "express";
import {
    JwtRefreshCookieName,
    JwtRefreshCookieOptions,
} from "src/configs/cookie.constant";

@Injectable()
export class CookieService {
    getCookieRefreshToken(req: Request) {
        return req.cookies[JwtRefreshCookieName];
    }

    setCookieRefreshToken(res: Response, refreshToken: string): void {
        res.cookie(JwtRefreshCookieName, refreshToken, {
            ...JwtRefreshCookieOptions,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
        });
    }

    clearCookieRefreshToken(res: Response): void {
        res.clearCookie(JwtRefreshCookieName, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
        });
    }
}
