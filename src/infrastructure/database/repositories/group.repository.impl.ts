import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOptionsRelations } from "typeorm";
import { GroupORM } from "src/infrastructure/database/typeorm/entities/group.orm-entity";
import { GroupRepository as AbsctractGroupRepo } from "src/core/group/repositories/group.repository";
import { Group } from "src/core/group/entities/group.entity";
import { GroupMapper } from "src/infrastructure/database/typeorm/mappers/group.mapper";

@Injectable()
export class GroupRepositoryImpl implements AbsctractGroupRepo {
    constructor(
        @InjectRepository(GroupORM)
        private readonly ormRepo: Repository<GroupORM>,
    ) { }

    async findGroupByMemberId(userId: string): Promise<Group> {
        const group = await this.ormRepo
            .createQueryBuilder('group')
            .leftJoinAndSelect('group.members', 'member')
            .where('member.id = :id', { id: userId })
            .getOne();

        if (!group) throw new Error('Group not found');
        return group;
    }

    create(group: Partial<Group>): Group {
        return GroupMapper.toDomain(this.ormRepo.create(group));
    }
    async findOneBy(where: Partial<Group>): Promise<Group | null> {
        const group = await this.ormRepo.findOne({ where, relations });
        return group ? GroupMapper.toDomain(group) : null;
    }

    async findOneByOrFail(where: Partial<Group>): Promise<Group> {
        const group = await this.ormRepo.findOneOrFail({ where, relations });
        return GroupMapper.toDomain(group);
    }

    async find(domainOptions: Partial<Group>): Promise<Group[]> {
        const ormOptions = { where: domainOptions }; // pastikan valid
        const groups = await this.ormRepo.find({ ...ormOptions, relations });
        return groups.map(GroupMapper.toDomain);
    }

    async save(group: Partial<Group>): Promise<Group> {
        const created = this.ormRepo.create(GroupMapper.toOrm(group)); // domain → ORM
        const saved = await this.ormRepo.save(created);
        return GroupMapper.toDomain(saved);
    }

    async update(id: string, group: Partial<Group>): Promise<Group> {
        await this.ormRepo.update(id, GroupMapper.toOrm(group));
        const updated = await this.ormRepo.findOneOrFail({ where: { id }, relations });
        return GroupMapper.toDomain(updated);
    }

    async remove(group: Group): Promise<Group> {
        const ormGroup = await this.ormRepo.findOneOrFail({ where: { id: group.id } });
        const removed = await this.ormRepo.remove(ormGroup);
        return GroupMapper.toDomain(removed);
    }
}

export const relations: FindOptionsRelations<GroupORM> = {
    members: true
};


