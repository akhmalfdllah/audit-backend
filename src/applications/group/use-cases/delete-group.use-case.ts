import { BadRequestException } from '@nestjs/common';
import { GroupRepository } from 'src/core/group/repositories/group.repository';

export class DeleteGroupUseCase {
    constructor(private readonly groupRepository: GroupRepository) { }

    async execute(id: string) {
        const group = await this.groupRepository.findOneByOrFail({ id }).catch(() => {
            throw new BadRequestException('group not found!');
        });
        return await this.groupRepository.remove(group);
    }
}