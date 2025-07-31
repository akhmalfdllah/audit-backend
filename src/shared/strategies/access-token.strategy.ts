import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import type { DecodedUser } from "src/types/jwt.type";
import { JwtAccessName, JwtAccessSecretKey } from "src/configs/jtw.constant";
import { Request } from "express";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, JwtAccessName) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        return req.cookies?.access_token || null;
      },
      ignoreExpiration: false,
      secretOrKey: JwtAccessSecretKey,
    });
  }

  async validate(payload: DecodedUser) {
    return {
      id: payload.id,
      role: payload.role,
    };
  }
}
