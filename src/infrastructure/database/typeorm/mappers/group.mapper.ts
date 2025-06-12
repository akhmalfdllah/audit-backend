// group.mapper.ts
import { Group } from "src/core/group/entities/group.entity";
import { GroupORM } from "src/infrastructure/database/typeorm/entities/group.orm-entity";
import { UserMapper } from "./user.mapper"; // jika ada relasi

export class GroupMapper {
    static toDomain(orm: GroupORM): Group {
        return new Group(
            orm.id,
            orm.name,
            orm.description,
            orm.members?.map(UserMapper.toDomain),
            orm.createdAt,
            orm.updatedAt
        );
    }

    static toOrm(domain: Partial<Group>): GroupORM {
        const orm = new GroupORM();
        orm.id = domain.id;
        orm.name = domain.name;
        orm.description = domain.description;
        orm.members = domain.members?.map(UserMapper.toORM);
        orm.createdAt = domain.createdAt;
        orm.updatedAt = domain.updatedAt;
        return orm;
    }
}
