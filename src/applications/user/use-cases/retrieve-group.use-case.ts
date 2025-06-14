import { Injectable, NotFoundException } from "@nestjs/common";
import { GroupRepository } from "src/core/group/repositories/group.repository";

@Injectable()
export class RetrieveGroupUseCase {
  constructor(private readonly groupRepository: GroupRepository) {}

  async execute(userId: string) {
    const group = await this.groupRepository.findGroupByMemberId(userId).catch(() => {
      throw new NotFoundException("You are not registered in any group!");
    });
    return group;
  }
}