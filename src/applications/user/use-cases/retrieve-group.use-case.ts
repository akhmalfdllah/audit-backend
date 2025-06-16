import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { GroupRepository } from "src/core/group/repositories/group.repository";

@Injectable()
export class RetrieveGroupUseCase {
  constructor(private readonly groupRepository: GroupRepository) { }

  async execute(userId: string) {
    if (!userId) {
      throw new BadRequestException("userId is required");
    }

    try {
      const group = await this.groupRepository.findGroupByMemberId(userId);
      return group;
    } catch {
      throw new NotFoundException("You are not registered in any group!");
    }
  }
}