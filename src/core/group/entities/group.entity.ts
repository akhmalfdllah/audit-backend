import { User } from "src/core/user/entities/user.entity";
export class Group {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public members: User[] = [],
        public createdAt: Date,
        public updatedAt: Date
    ) { }
}
