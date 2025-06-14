import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GroupRepository } from 'src/core/group/repositories/group.repository';
import { UpdateGroupBodyDto } from 'src/applications/group/dto/update-group-body.dto';
import { GroupPayloadDto } from 'src/applications/group/dto/group-payload.dto';

export class UpdateGroupUseCase {
    constructor(private readonly groupRepository: GroupRepository) { }

    async execute(id: string, updateGroupBodyDto: UpdateGroupBodyDto) {
        const group = await this.groupRepository.findOneByOrFail({ id }).catch(() => {
            throw new NotFoundException('group not found!');
        });
        const updated = await this.groupRepository.save({ ...group, ...updateGroupBodyDto });
        return plainToInstance(GroupPayloadDto, updated);
    }
}