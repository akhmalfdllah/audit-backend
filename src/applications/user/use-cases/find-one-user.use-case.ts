import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class FindOneUserUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(id: string): Promise<UserPayloadDto> {
        if (!id) {
            throw new BadRequestException("id is required");
        }

        try {
            const user = await this.userRepository.findOneByOrFail({ id });
            return plainToInstance(UserPayloadDto, user);
        } catch {
            throw new NotFoundException("user not found!");
        }
    }
}
