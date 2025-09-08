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
import cookieConfig from './configs/cookie.config';
import { zodValidator } from './shared/utils/zod-env-validator';
import envValidationSchema from './configs/env.validation';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ErpSchedulerService } from 'src/erp/erp-scheduler.service';

@Module({
  imports: [
    // 🔧 Register all config globally
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, cookieConfig, hashConfig],
      envFilePath: '.env',
      validate: zodValidator(envValidationSchema),
    }),

    // 🛢️ Dynamic database config
    TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: parseInt(config.get<string>('DB_PORT'), 10),
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),  // ✅ pastikan string
    database: config.get<string>('DB_NAME'),
    autoLoadEntities: true,
    synchronize: false,
    migrations: ['dist/src/migrations/*.js'],
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
  providers: [
    ErpSchedulerService,   // ✅ Wajib ada
  ],
})
export class AppModule { }
