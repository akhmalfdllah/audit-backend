import { Injectable } from "@nestjs/common";
import { GroupRepositoryImpl } from "src/infrastructure/database/repositories/group.repository.impl";
import { GroupORMMapper } from "src/infrastructure/database/typeorm/mappers/group.mapper";

@Injectable()
export class FindAllGroupsUseCase {
    constructor(private readonly repo: GroupRepositoryImpl) { }

    async execute() {
        const groups = await this.repo.findAll();
        return groups.map(GroupORMMapper.toResponse);
    }
}
