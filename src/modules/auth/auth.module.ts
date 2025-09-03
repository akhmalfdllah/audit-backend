import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "src/modules/user/user.module";
import { AuthController } from "src/interfaces/http/auth/auth.controller";
import { AuthFacadeService } from "src/interfaces/http/auth/auth.facade.service";
import {
    SignInUseCase,
    RefreshTokenUseCase,
    SignOutUseCase,
    MeUseCase,
} from "src/applications/auth/use-cases/common.use-case"
import { AccessTokenStrategy } from "src/shared/strategies/access-token.strategy";
import { RefreshTokenStrategy } from "src/shared/strategies/refresh-token.strategy";
import { ArgonService } from "src/shared/services/argon.service";
import { CookieService } from "src/shared/services/cookie.service";
import { TokenService } from "src/shared/services/token.service";
import { AuditLogModule } from "../audit-log/audit-log.module";
import { UserFacadeService } from "src/interfaces/http/user/user.facade.service";
import { GroupModule } from "src/modules/group/group.module";

@Module({
    imports: [
        ConfigModule, // pastikan ada
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const secret = config.get<string>('jwt.secret');
                console.log('JWT_SECRET from ConfigService:', secret); // 🔍 debug
                return {
                    secret,
                    signOptions: { expiresIn: config.get<string>('jwt.expiresIn') },
                };
            },
        }),
        UserModule,
        AuditLogModule,
        GroupModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthFacadeService,
        // Use Cases
        SignInUseCase,
        RefreshTokenUseCase,
        SignOutUseCase,
        MeUseCase,
        // Shared Services
        TokenService,
        ArgonService,
        CookieService,
        // JWT Strategies
        RefreshTokenStrategy,
        AccessTokenStrategy,
        UserFacadeService,
    ],
    exports: [AuthFacadeService],
})
export class AuthModule { }
