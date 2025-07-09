import { Injectable, NotFoundException } from "@nestjs/common";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { GroupORMMapper } from "src/infrastructure/database/typeorm/mappers/group.mapper";

@Injectable()
export class FindGroupByIdUseCase {
    constructor(private readonly groupRepo: GroupRepository) { }

    async execute(groupId: string) {
        const group = await this.groupRepo.findById(groupId);
        if (!group) throw new NotFoundException("Group not found");
        return GroupORMMapper.toDomainResponse(group);
    }
}
