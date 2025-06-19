import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import type { DecodedUser } from "src/types/jwt.type";
import { JwtAccessName, JwtAccessSecretKey } from "src/configs/jwt.config";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, JwtAccessName) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtAccessSecretKey,
    });
  }

  async validate(payload: DecodedUser) {
    return {
      id: payload.id,
      role: payload.role
    }
  }
}