import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
    DB_TYPE,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE_NAME,
} from './env.config'


export const DatabaseConfig: TypeOrmModuleOptions = {
    type: DB_TYPE as 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE_NAME,
    synchronize: true,
    entities: ['dist/**/*.entity.js'],
}

export enum TableName {
    User = "User",
    Group = "Group",
    Transaction = "Transaction"
}

export enum UserRole {
    User = "user",
    Admin = "admin",
}