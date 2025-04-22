import { IntersectionType } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { User } from "src/modules/user/entities/user.entity";

const transformLinks = (user: User): Record<string, Link>=> {
    const self = new Link(`/user/${user.id}`);
    const group = new Link(`/group?member=${user.id}`);
    return { self, group};
}

export class UserPayloadDto extends IntersectionType(User, Actions, Links) {
    
    @Expose()
    _action: Action[];
    
    @Expose()
    @Transform(({obj}) => transformLinks(obj))
    _links: Record<string, Link>;
}

export * from "src/modules/user/entities/user.entity";