// src/shared/shared.module.ts
import { Module } from '@nestjs/common';
import { ArgonService } from './services/argon.service';
import { CookieService } from './services/cookie.service';
import { TokenService } from './services/token.service';

@Module({
    providers: [ArgonService, CookieService, TokenService],
    exports: [ArgonService, CookieService, TokenService],
})
export class SharedModule { }
