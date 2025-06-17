import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import {
  JwtAccessSignOptions,
  JwtRefreshSignOptions,
  JwtCommonSignOptions,
} from "src/configs/jwt.config";

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) { }

  async signAccessToken<T extends object>(data: T): Promise<string> {
    return this.jwtService.signAsync(data, JwtAccessSignOptions);
  }

  async signRefreshToken<T extends object>(data: T): Promise<string> {
    return this.jwtService.signAsync(data, JwtRefreshSignOptions);
  }

  async signCustomToken<T extends object>(data: T): Promise<string> {
    return this.jwtService.signAsync(data, JwtCommonSignOptions);
  }

  async verifyToken<T extends object>(token: string, secret: string): Promise<T> {
    try {
      return await this.jwtService.verifyAsync<T>(token, { secret });
    } catch (error) {
      throw new UnauthorizedException("invalid token!");
    }
  }

  async signToken<T extends object>(payload: T, options: JwtSignOptions) {
    return this.jwtService.signAsync(payload, options);
  }

  async generateTokens(payload: { id: string; role: string }) {
    const [jwtAccessToken, jwtRefreshToken] = await Promise.all([
      this.signAccessToken(payload),
      this.signRefreshToken(payload),
    ]);
    return { jwtAccessToken, jwtRefreshToken };
  }

}
