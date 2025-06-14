import { NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { GroupPayloadDto } from "src/applications/group/dto/group-payload.dto";

export class FindOneGroupUseCase {
    constructor(private readonly groupRepository: GroupRepository) { }

    async execute(id: string) {
        const group = await this.groupRepository.findOneByOrFail({ id }).catch(() => {
            throw new NotFoundException("group not found!");
        });
        return plainToInstance(GroupPayloadDto, group);
    }
}