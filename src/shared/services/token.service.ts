import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signAccessToken<T extends object>(data: T): Promise<string> {
    return this.jwtService.signAsync(data, {
      secret: this.configService.get<string>('jwt.secret'),
      expiresIn: this.configService.get<string>('jwt.expiresIn'),
    });
  }

  async signRefreshToken<T extends object>(data: T): Promise<string> {
    return this.jwtService.signAsync(data, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: this.configService.get<string>('jwt.refreshExpiresIn'),
    });
  }

  async signCustomToken<T extends object>(data: T): Promise<string> {
    return this.jwtService.signAsync(data, {
      secret: this.configService.get<string>('jwt.secret'), // atau custom config jika ada
      expiresIn: '10m', // contoh fixed expiry
    });
  }

  async verifyToken<T extends object>(token: string, secret: string): Promise<T> {
    try {
      return await this.jwtService.verifyAsync<T>(token, { secret });
    } catch (error) {
      throw new UnauthorizedException("invalid token!");
    }
  }

  async signToken<T extends object>(
    payload: T,
    options: { secret: string; expiresIn: string },
  ): Promise<string> {
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
