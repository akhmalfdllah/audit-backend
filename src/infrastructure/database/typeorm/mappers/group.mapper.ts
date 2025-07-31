// src/infrastructure/database/mappers/group.mapper.ts

import { GroupORM } from "../entities/group.orm-entity";
import { Group } from "src/core/group/entities/group.entity";
import { GroupType } from "src/core/group/entities/group.entity";
import { UserORM } from "../entities/user.orm-entity";

export class GroupORMMapper {
    /**
     * DTO → ORM entity (biasanya saat create)
     */
    static fromCreateDto(dto: {
        name: string;
        description: string;
        type?: GroupType;
    }): GroupORM {
        const entity = new GroupORM();
        entity.name = dto.name;
        entity.description = dto.description;
        entity.type = dto.type || GroupType.Internal;
        return entity;
    }

    /**
     * ORM → Domain Entity
     */
    static toDomain(orm: GroupORM): Group {
        return new Group(
            orm.id,
            orm.name,
            orm.description,
            orm.type,
            [], // atau mapping members
            orm.createdAt,
            orm.updatedAt
        );
    }

    static toOrm(domain: Group): GroupORM {
        const orm = new GroupORM();
        orm.id = domain.id;
        orm.name = domain.name;
        orm.description = domain.description;
        orm.type = domain.type;
        orm.createdAt = domain.createdAt;
        orm.updatedAt = domain.updatedAt;

        orm.members = domain.members.map((member) => {
            const userOrm = new UserORM();
            userOrm.id = member.id;
            userOrm.fullName = member.fullName;
            userOrm.email = member.email;
            userOrm.role = member.role;
            userOrm.status = member.status;
            userOrm.createdAt = member.createdAt;
            userOrm.updatedAt = member.updatedAt;
            userOrm.groupId = orm.id;
            return userOrm;
        });
        return orm;
    }

    /**
     * ORM[] → Domain[]
     */
    static toDomains(orms: GroupORM[]): Group[] {
        return orms.map(this.toDomain);
    }

    /**
     * ORM → Plain response (untuk controller output)
     */
    static toDomainResponse(domain: Group) {
        return {
            id: domain.id,
            name: domain.name,
            description: domain.description,
            type: domain.type,
            createdAt: domain.createdAt,
            updatedAt: domain.updatedAt,
        };
    }

}
