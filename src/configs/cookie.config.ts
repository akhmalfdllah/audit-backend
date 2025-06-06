import type { CookieOptions } from "express";
import * as Env from "src/configs/env.config";

const getMaxAgeInDay = (day: number) => {
  return day * 24 * 60 * 60 * 1000;
};

export const JwtRefreshCookieName = Env.JWT_REFRESH_COOKIE_NAME;
export const JwtRefreshCookieOptions: CookieOptions = {
  httpOnly: true,
  secure: Env.JWT_REFRESH_COOKIE_SECURE.toLowerCase() === "true",
  sameSite: "strict",
  maxAge: getMaxAgeInDay(6),
};
