import { Injectable, NotFoundException } from "@nestjs/common";
import { GroupRepositoryImpl } from "src/infrastructure/database/repositories/group.repository.impl";

@Injectable()
export class DeleteGroupUseCase {
    constructor(private readonly groupRepo: GroupRepositoryImpl) { }

    async execute(groupId: string) {
        const existing = await this.groupRepo.findById(groupId);
        if (!existing) throw new NotFoundException("Group not found");

        await this.groupRepo.remove(groupId);
        return { message: "Group deleted successfully" };
    }
}
