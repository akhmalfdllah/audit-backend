import { plainToInstance } from "class-transformer";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { SearchGroupQueryTransformed } from "src/applications/group/dto/search-group-query.dto";
import { GroupPayloadDto } from "src/applications/group/dto/group-payload.dto";

export class FindAllGroupUseCase {
    constructor(private readonly groupRepository: GroupRepository) { }

    async execute({ member }: SearchGroupQueryTransformed) {
        const groups = await this.groupRepository.find({ where: { id: member.id } });
        return plainToInstance(GroupPayloadDto, groups);
    }
}
