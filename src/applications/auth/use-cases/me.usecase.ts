import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/core/user/repositories/user.repository";

@Injectable()
export class MeUseCase {
    constructor(private readonly userRepo: UserRepository) { }

    async execute(userId: string) {
        const user = await this.userRepo.findById(userId);
        if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
    };
  }
}