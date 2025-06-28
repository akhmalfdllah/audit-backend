import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { plainToInstance } from "class-transformer";
import { GroupSummaryDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class RetrieveGroupUseCase {
  constructor(private readonly groupRepository: GroupRepository) { }

  async execute(userId: string): Promise<GroupSummaryDto> {
    if (!userId) {
      throw new BadRequestException("userId is required");
    }

    try {
      const group = await this.groupRepository.findGroupByMemberId(userId);
      return plainToInstance(GroupSummaryDto, group, {
        excludeExtraneousValues: true,
      });
    } catch {
      throw new NotFoundException("You are not registered in any group!");
    }
  }
}