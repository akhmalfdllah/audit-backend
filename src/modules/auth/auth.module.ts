import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/modules/user/user.module";
import { AuthController } from "src/interfaces/http/auth/auth.controller";
import { AuthFacadeService } from "src/interfaces/http/auth/auth.facade.service";
import {
    SignInUseCase,
    RefreshTokenUseCase,
    SignOutUseCase,
} from "src/applications/auth/use-cases/common.use-case"
import { AccessTokenStrategy } from "src/shared/strategies/access-token.strategy";
import { RefreshTokenStrategy } from "src/shared/strategies/refresh-token.strategy";
import { ArgonService } from "src/shared/services/argon.service";
import { CookieService } from "src/shared/services/cookie.service";
import { TokenService } from "src/shared/services/token.service";
import { AuditLogModule } from "../audit-log/audit-log.module";

@Module({
    imports: [
        JwtModule.register({ global: true }),
        UserModule, AuditLogModule
    ],
    controllers: [AuthController],
    providers: [AuthFacadeService,

        // Use Cases
        SignInUseCase,
        RefreshTokenUseCase,
        SignOutUseCase,
        // Shared Services
        TokenService,
        ArgonService,
        CookieService,

        // JWT Strategies
        RefreshTokenStrategy,
        AccessTokenStrategy,
    ],
    exports: [AuthFacadeService],
})
export class AuthModule { }
