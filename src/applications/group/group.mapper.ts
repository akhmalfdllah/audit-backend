// src/applications/group/mappers/group.mapper.ts

import { CreateGroupBodyDto } from "src/applications/group/dto/create-group-body.dto";
import { UpdateGroupBodyDto } from "src/applications/group/dto/update-group-body.dto";
import { Group, GroupType } from "src/core/group/entities/group.entity";

/**
 * Mapping DTO → Domain (saat create)
 */
export function mapCreateGroupDtoToDomain(dto: CreateGroupBodyDto): Partial<Group> {
  return {
    name: dto.name,
    description: dto.description,
    type: dto.type || GroupType.INTERNAL,
    members: [], // default kosong
  };
}

/**
 * Mapping Update DTO → Domain (update penuh)
 */
export function mapUpdateGroupDtoToDomain(group: Group, dto: UpdateGroupBodyDto): Group {
  return new Group(
    group.id,
    dto.name ?? group.name,
    dto.description ?? group.description,
    group.type, // tidak bisa update type dari sini
    group.members,
    group.createdAt,
    group.updatedAt
  );
}
