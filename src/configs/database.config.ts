import { registerAs } from '@nestjs/config';

// import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import {
//     DB_TYPE,
//     DB_HOST,
//     DB_PORT,
//     DB_USERNAME,
//     DB_PASSWORD,
//     DB_DATABASE_NAME,
// } from './env.config'



export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}));


export enum TableName {
    User = "User",
    Group = "Group",
    AuditLog = "AuditLog",
    Transaction = "Transaction"
}

export enum BooleanStatus {
    True = "true",
    False = "false",
  }

// export enum UserRole {
//     User = "user",
//     Admin = "admin",
// }