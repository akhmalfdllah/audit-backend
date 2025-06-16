// src/applications/group/mappers/group.mapper.ts
import { CreateGroupBodyDto } from "src/applications/group/dto/create-group-body.dto";
import { Group } from "src/core/group/entities/group.entity";
import { UpdateGroupBodyDto } from "src/applications/group/dto/update-group-body.dto";

export function mapCreateGroupDtoToDomain(dto: CreateGroupBodyDto): Partial<Group> {
  return {
    name: dto.name,
    description: dto.description,
    members: [], // default value
  };
}

export function mapUpdateGroupDtoToDomain(group: Group, dto: UpdateGroupBodyDto): Group {
  return new Group(
    group.id,
    dto.name ?? group.name,
    dto.description ?? group.description,
    group.members,
    group.createdAt,
    group.updatedAt
  );
}
