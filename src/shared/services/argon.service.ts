import { Injectable } from "@nestjs/common";
import * as argon from "argon2";
import { ArgonHashOptions, ArgonVerifyOptions } from "src/configs/hash.config";
@Injectable()
export class ArgonService {
    async hashPassword(plainPassword: string): Promise<string> {
        return await argon.hash(plainPassword, ArgonHashOptions);
    }

    async verifyPassword(hashedPassword: string, plainPassword: string): Promise<boolean> {
        return await argon.verify(hashedPassword, plainPassword, ArgonVerifyOptions);
      }
}