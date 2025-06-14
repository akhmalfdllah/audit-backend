import { Injectable } from "@nestjs/common";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/core/user/repositories/user.repository";

@Injectable()
export class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: string) {
        const user = await this.userRepository.findOneByOrFail({ id }).catch(() => {
            throw new NotFoundException("user not found!");
        });

        const deleted = await this.userRepository.remove(user).catch(() => {
            throw new ConflictException("unable to delete this record due to existing references in related tables.");
        });

        return { message: `user ${deleted.username} successfully deleted.` };
    }
}