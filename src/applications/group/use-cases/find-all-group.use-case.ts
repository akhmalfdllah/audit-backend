import { Injectable } from "@nestjs/common";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { GroupORMMapper } from "src/infrastructure/database/typeorm/mappers/group.mapper";

@Injectable()
export class FindAllGroupsUseCase {
    constructor(private readonly repo: GroupRepository) { }

    async execute() {
        const groups = await this.repo.findAll();
        return groups.map(GroupORMMapper.toDomainResponse);
    }
}
