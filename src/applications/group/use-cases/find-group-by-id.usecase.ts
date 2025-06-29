import { Injectable, NotFoundException } from "@nestjs/common";
import { GroupRepositoryImpl } from "src/infrastructure/database/repositories/group.repository.impl";
import { GroupORMMapper } from "src/infrastructure/database/typeorm/mappers/group.mapper";

@Injectable()
export class FindGroupByIdUseCase {
    constructor(private readonly groupRepo: GroupRepositoryImpl) { }

    async execute(groupId: string) {
        const group = await this.groupRepo.findById(groupId);
        if (!group) throw new NotFoundException("Group not found");
        return GroupORMMapper.toResponse(group);
    }
}
