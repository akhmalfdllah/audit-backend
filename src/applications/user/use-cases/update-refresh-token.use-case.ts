import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { ArgonService } from "src/shared/services/argon.service";
@Injectable()
export class UpdateRefreshTokenUseCase {
    constructor(private readonly userRepository: UserRepository,
        private readonly argonService: ArgonService
    ) { }

    async execute(userId: string, refreshToken: string) {
        await this.userRepository.findOneByOrFail({ id: userId }).catch(() => {
            throw new NotFoundException("user not found!");
        });

        const hashed = await this.argonService.hashPassword(refreshToken); // ✅

        await this.userRepository.update(userId, { hashedRefreshToken: hashed }); // ✅
        const updatedUser = await this.userRepository.findOneByOrFail({ id: userId });
        return plainToInstance(UserPayloadDto, updatedUser, { excludeExtraneousValues: true });
    }
}
