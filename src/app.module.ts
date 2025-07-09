// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import databaseConfig from './configs/database.config';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { GroupModule } from './modules/group/group.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { AuditLogModule } from './modules/audit-log/audit-log.module';
import hashConfig from './configs/hash.config';
import jwtConfig from './configs/jwt.config';
import cookieConfig  from './configs/cookie.config';
import { zodValidator } from './shared/utils/zod-env-validator';
import envValidationSchema from './configs/env.validation';

@Module({
  imports: [
    // 🔧 Register all config globally
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, cookieConfig, hashConfig],
      validate: zodValidator(envValidationSchema),
    }),

    // 🛢️ Dynamic database config
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.database'),
        synchronize: true, // ⛔ Hati-hati! Jangan true di produksi
        autoLoadEntities: true,
      }),
    }),

    // 🧩 Feature modules
    AuthModule,
    UserModule,
    GroupModule,
    TransactionModule,
    AuditLogModule,
  ],
})
export class AppModule { }
