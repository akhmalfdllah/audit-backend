// src/domain/user/entities/user.entity.ts
import { Group } from "src/core/group/entities/group.entity";

export enum UserRole {
    User = "User",
    Auditor = "Auditor",
    Admin = "Admin",
    ERP = "ERP", // opsional jika mendukung create user
}

export enum UserStatus {
    Active = "Active",
    Inactive = "Inactive",
}

export class User {
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public role: UserRole,
        public status: UserStatus,
        public fullName: string, // opsional untuk kebutuhan UI
        public email: string, // opsional
        public group: Group,
        public createdAt: Date,
        public updatedAt: Date,
        public hashedRefreshToken?: string,
        public refreshToken?: string
    ) { }
}
