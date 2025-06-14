import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class FindOneUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: string) {
        const user = await this.userRepository.findOneByOrFail({ id }).catch(() => {
            throw new NotFoundException("user not found!");
        });
        return plainToInstance(UserPayloadDto, user);
    }
}