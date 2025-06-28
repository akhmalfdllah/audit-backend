import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { GroupModule } from './modules/group/group.module';
import { AppErrorFilter } from './shared/filters/app-error.filter';
import { DatabaseConfig } from './configs/database.config';
import { JwtRolesGuard } from './shared/guards/jwt-role.guard';
import { JwtAccessGuard } from './shared/guards/jwt-access.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...DatabaseConfig }),
    AuthModule,
    UserModule,
    GroupModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: AppErrorFilter },
    { provide: APP_GUARD, useClass: JwtAccessGuard },
    { provide: APP_GUARD, useClass: JwtRolesGuard },
  ],
})
export class AppModule { }
