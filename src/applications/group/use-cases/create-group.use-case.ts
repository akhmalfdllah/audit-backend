import { Injectable } from "@nestjs/common";
import { CreateGroupBodyDto } from "src/applications/group/dto/create-group-body.dto";
import { GroupORMMapper } from "src/infrastructure/database/typeorm/mappers/group.mapper";
import { GroupRepository } from "src/core/group/repositories/group.repository";

@Injectable()
export class CreateGroupUseCase {
  constructor(
    private readonly repo: GroupRepository,
  ) { }

  async execute(dto: CreateGroupBodyDto) {
    const group = GroupORMMapper.fromCreateDto(dto);
    const saved = await this.repo.save(group);
    return GroupORMMapper.toDomainResponse(saved);
  }

}
