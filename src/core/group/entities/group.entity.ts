import { User } from "src/core/user/entities/user.entity";

export enum GroupType {
    Internal = "Internal",
    External = "External",
    System = "System",
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
