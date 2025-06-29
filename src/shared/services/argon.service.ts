import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as argon from "argon2";
// import { ArgonHashOptions, ArgonVerifyOptions } from "src/configs/hash.config";
@Injectable()
export class ArgonService {
  constructor(private configService: ConfigService) { }

  async hashPassword(plainPassword: string): Promise<string> {
    return await argon.hash(plainPassword, {
      type: argon.argon2id,
      salt: Buffer.from(this.configService.get<string>('hash.salt')),
      memoryCost: this.configService.get<number>('hash.memoryCost'),
      timeCost: this.configService.get<number>('hash.timeCost'),
      parallelism: this.configService.get<number>('hash.parallelism'),
    });
  }

  async verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
    return await argon.verify(hashedPassword, plainPassword);
  }

  async verifyRefereshToken(hashedRefreshToken: string, refreshToken: string): Promise<boolean> {
    return await argon.verify(hashedRefreshToken, refreshToken);
  }
}