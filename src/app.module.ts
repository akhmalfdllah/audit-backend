import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_FILTER } from "@nestjs/core";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...DatabaseConfig}),
    AuthModule,
    UserModule,
    NodeModule,
    GroupModule,
    ProfileModule
  ],
  providers: [{ provide: APP_FILTER, useClass: AppErrorFilter }],
})
export class AppModule { }
