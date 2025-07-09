import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateGroupBodyDto } from '../dto/update-group-body.dto';
import { GroupRepository } from 'src/core/group/repositories/group.repository';
import { GroupORMMapper } from 'src/infrastructure/database/typeorm/mappers/group.mapper';

@Injectable()
export class UpdateGroupUseCase {
    constructor(private readonly groupRepo: GroupRepository) { }

    async execute(groupId: string, dto: UpdateGroupBodyDto) {
        const existing = await this.groupRepo.findById(groupId);
        if (!existing) throw new NotFoundException('Group not found');

        if (dto.name) existing.name = dto.name;
        if (dto.description) existing.description = dto.description;
        if (dto.type) existing.type = dto.type;

        const updated = await this.groupRepo.update(existing);
        // ✅ gunakan ini jika hasilnya adalah Group (domain)
        return GroupORMMapper.toDomainResponse(updated);

    }
}
