import { Group } from "src/core/group/entities/group.entity";

// src/domain/user/entities/user.entity.ts
export enum UserRole {
    User = "user",
    Auditor = "auditor",
}
export class User {
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public role: UserRole,
        public refreshToken: string | null,
        public groups: Group[] = [],
        public createdAt: Date,
        public updatedAt: Date
    ) { }
}

