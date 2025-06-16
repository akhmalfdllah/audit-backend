// src/applications/group/use-cases/create-group.usecase.ts
import { ConflictException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { CreateGroupBodyDto } from "../dto/create-group-body.dto";
import { GroupPayloadDto } from "../dto/group-payload.dto";
import { mapCreateGroupDtoToDomain } from "src/applications/group/group.mapper";

export class CreateGroupUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(createGroupBodyDto: CreateGroupBodyDto) {
    const existGroup = await this.groupRepository.findOneBy({ name: createGroupBodyDto.name });
    if (existGroup) {
      throw new ConflictException("group name already exists!");
    }

    const domainPartial = mapCreateGroupDtoToDomain(createGroupBodyDto);
    const groupEntity = this.groupRepository.create(domainPartial);
    const savedGroup = await this.groupRepository.save(groupEntity);

    return plainToInstance(GroupPayloadDto, savedGroup);
  }
}
