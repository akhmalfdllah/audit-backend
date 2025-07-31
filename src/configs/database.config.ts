import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
    url: process.env.DATABASE_URL,
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