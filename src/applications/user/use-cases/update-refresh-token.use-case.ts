import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class UpdateRefreshTokenUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userId: string, refreshToken: string) {
        const user = await this.userRepository.findOneByOrFail({ id: userId }).catch(() => {
            throw new NotFoundException("user not found!");
        });

        const updated = await this.userRepository.update(userId, { refreshToken });
        return plainToInstance(UserPayloadDto, updated);
    }
}
