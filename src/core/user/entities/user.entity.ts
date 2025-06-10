// src/domain/user/entities/user.entity.ts
export enum UserRole {
    User = "user",
    Admin = "admin",
}
export class User {
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public role: UserRole,
        public refreshToken: string | null,
        public groupId: string | null,
        public createdAt: Date,
        public updatedAt: Date
    ) { }
}

