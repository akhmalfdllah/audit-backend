import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GroupORM } from "src/infrastructure/database/typeorm/entities/group.orm-entity";

@Injectable()
export class GroupRepository {
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

    async update(group: GroupORM): Promise<GroupORM> {
        return this.repo.save(group); // bisa dipakai juga untuk update
    }

    async remove(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}
