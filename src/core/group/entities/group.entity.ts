import { User } from "src/core/user/entities/user.entity";

export enum GroupType {
    INTERNAL = "internal",
    EXTERNAL = "external",
    SYSTEM = "SYSTEM",
}
export class Group {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public type: GroupType,
        public members: User[],
        public createdAt: Date,
        public updatedAt: Date
    ) { }
}
