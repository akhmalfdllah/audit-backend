// src/infrastructure/database/mappers/group.mapper.ts

import { GroupORM } from "../entities/group.orm-entity";
import { Group } from "src/core/group/entities/group.entity";
import { GroupType } from "src/core/group/entities/group.entity";

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
        entity.type = dto.type || GroupType.INTERNAL;
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
    static toResponse(orm: GroupORM) {
        return {
            id: orm.id,
            name: orm.name,
            description: orm.description,
            type: orm.type,
            createdAt: orm.createdAt,
            updatedAt: orm.updatedAt,
        };
    }
}
