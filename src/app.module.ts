// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from './configs/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { GroupModule } from './modules/group/group.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { AuditLogModule } from './modules/audit-log/audit-log.module';
import hashConfig from './configs/hash.config';
import jwtConfig from './configs/jwt.config';
import cookieConfig from './configs/cookie.config';
import { zodValidator } from './shared/utils/zod-env-validator';
import envValidationSchema from './configs/env.validation';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    // 🔧 Register all config globally
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
      load: [databaseConfig, jwtConfig, cookieConfig, hashConfig],
      validate: zodValidator(envValidationSchema),
    }),

    // 🛢️ Dynamic database config
    TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    url: configService.get<string>('database.url'), // ✅ BENAR: pakai configService, bukan config
    autoLoadEntities: true,
    synchronize: false,
  }),
}),


    // 🧩 Feature modules
    AuthModule,
    UserModule,
    GroupModule,
    TransactionModule,
    AuditLogModule,
    DashboardModule
  ],
})
export class AppModule { }
