import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Group } from "src/core/group/entities/group.entity";
import { GroupORM } from "src/infrastructure/database/typeorm/entities/group.orm-entity";
import { GroupORMMapper } from "src/infrastructure/database/typeorm/mappers/group.mapper";

@Injectable()
export class GroupRepositoryImpl {
    constructor(
        @InjectRepository(GroupORM)
        private readonly repo: Repository<GroupORM>
    ) { }

    async save(group: GroupORM): Promise<GroupORM> {
        return this.repo.save(group);
    }

    async findAll(): Promise<GroupORM[]> {
        return this.repo.find();
    }

    async findById(id: string): Promise<GroupORM | null> {
        return this.repo.findOne({ where: { id } });
    }

    async findOneByIdOrThrow(id: string): Promise<Group> {
        const group = await this.repo.findOne({ where: { id } });
        if (!group) {
            throw new NotFoundException(`Group with id ${id} not found`);
        }
        return GroupORMMapper.toDomain(group);
    }

    async update(group: GroupORM): Promise<GroupORM> {
        return this.repo.save(group); // bisa dipakai juga untuk update
    }

    async remove(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}
