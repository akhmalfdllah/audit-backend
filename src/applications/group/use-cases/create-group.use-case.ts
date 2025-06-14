import { ConflictException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { CreateGroupBodyDto } from "src/applications/group/dto/create-group-body.dto";
import { GroupPayloadDto } from "src/applications/group/dto/group-payload.dto";

export class CreateGroupUseCase {
    constructor(private readonly groupRepository: GroupRepository) { }

    async execute(createGroupBodyDto: CreateGroupBodyDto) {
        const existGroup = await this.groupRepository.findOneBy({ name: createGroupBodyDto.name });
        if (existGroup) {
            throw new ConflictException("group name already exists!");
        }
        const group = this.groupRepository.create(createGroupBodyDto);
        const newGroup = await this.groupRepository.save(group);
        return plainToInstance(GroupPayloadDto, newGroup);
    }
}