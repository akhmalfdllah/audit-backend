import { Group } from "src/core/group/entities/group.entity";
import { GroupORM } from "src/infrastructure/database/typeorm/entities/group.orm-entity";

export class GroupMapper {
    static toDomain(orm: GroupORM): Group {
        return new Group(
            orm.id,
            orm.name,
            orm.createdAt,
            orm.updatedAt,
        );
    }

    static toORM(group: Group): GroupORM {
        const orm = new GroupORM();
        orm.id = group.id;
        orm.name = group.name;
        return orm;
    }
}
