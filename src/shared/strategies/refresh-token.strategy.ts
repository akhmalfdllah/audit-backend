import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { JwtFromRequestFunction, Strategy } from "passport-jwt";
import type { DecodedUser } from "src/types/jwt.type";
import  cookieConfig  from "src/configs/cookie.config";
import { JwtRefreshName, JwtRefreshSecretKey } from "src/configs/jtw.constant";

const tokenExtractor: JwtFromRequestFunction<Request> = (req) => {
  const refreshToken = req.cookies[cookieConfig().name];
  return refreshToken;
};

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, JwtRefreshName) {
  constructor() {
    super({
      jwtFromRequest: tokenExtractor,
      ignoreExpiration: false,
      secretOrKey: JwtRefreshSecretKey,
    });
  }

  async validate(payload: DecodedUser) {
    return payload;
  }
}
