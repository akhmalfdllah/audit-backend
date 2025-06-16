import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/core/user/repositories/user.repository";

@Injectable()
export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: string) {
        let user;
        try {
            user = await this.userRepository.findOneByOrFail({ id });
        } catch {
            throw new NotFoundException("user not found!");
        }

        try {
            const deleted = await this.userRepository.remove(user);
            return { message: `user ${deleted.username} successfully deleted.` };
        } catch {
            throw new ConflictException(
                "unable to delete this record due to existing references in related tables.",
            );
        }
    }
}
