import { Injectable, NotFoundException } from "@nestjs/common";
import { GroupRepository } from "src/core/group/repositories/group.repository";

@Injectable()
export class DeleteGroupUseCase {
    constructor(private readonly groupRepo: GroupRepository) { }

    async execute(groupId: string) {
        const existing = await this.groupRepo.findById(groupId);
        if (!existing) throw new NotFoundException("Group not found");

        await this.groupRepo.remove(existing);
        return { message: "Group deleted successfully" };
    }
}
