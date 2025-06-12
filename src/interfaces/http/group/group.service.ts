import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { CreateGroupBodyDto } from "src/interfaces/http/group/dto/create-group-body.dto";
import { UpdateGroupBodyDto } from "src/interfaces/http/group/dto/update-group-body.dto";
import { SearchGroupQueryTransformed } from "src/interfaces/http/group/dto/search-group-query.dto";
import { GroupPayloadDto } from "src/interfaces/http/group/dto/group-payload.dto";

@Injectable()
export class GroupService {
  constructor(private groupRepository: GroupRepository) {}
  async save(createGroupBodyDto: CreateGroupBodyDto) {
    const existGroup = await this.groupRepository.findOneBy({ name: createGroupBodyDto.name });
    if (existGroup) {
      throw new ConflictException("group name already exists!");
    }
    const group = this.groupRepository.create(createGroupBodyDto);
    const newGroup = await this.groupRepository.save(group);
    return plainToInstance(GroupPayloadDto, newGroup);
  }

  async findAll({ member }: SearchGroupQueryTransformed) {
    const groups = await this.groupRepository.find({ where: { members: member }});
    return plainToInstance(GroupPayloadDto, groups);
  }

  async findOne(id: string) {
    const group = await this.groupRepository.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException("group not found!");
    });
    return plainToInstance(GroupPayloadDto, group);
  }

  async updated(id: string, updateGroupBodyDto: UpdateGroupBodyDto) {
    const group = await this.groupRepository.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException("group not found!");
    });
    const updated = await this.groupRepository.save({ ...group, ...updateGroupBodyDto });
    return plainToInstance(GroupPayloadDto, updated);
  }

  async remove(id: string) {
    const group = await this.groupRepository.findOneByOrFail({ id }).catch(() => {
      throw new BadRequestException("group not found!");
    });
    return await this.groupRepository.remove(group);
  }
}
