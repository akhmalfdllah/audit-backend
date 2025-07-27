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

    async execute(userId: string, refreshToken: string | null) {
        const user = await this.userRepository.findOneByOrFail({ id: userId }).catch(() => {
            throw new NotFoundException("User not found!");
        });
        if (!refreshToken) {
            // Clear stored hash
            user.hashedRefreshToken = null;
        } else {
            const hashed = await this.argonService.hashPassword(refreshToken);
            user.hashedRefreshToken = hashed;
        }
        const result = await this.userRepository.save(user);
        console.log("✅ UpdateRefreshTokenUseCase saved:", result.hashedRefreshToken);
        return plainToInstance(UserPayloadDto, result, { excludeExtraneousValues: true });
    }
}
