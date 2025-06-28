import { Injectable, UnauthorizedException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { ArgonService } from "src/shared/services/argon.service";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class VerifyUserWithRefreshTokenUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly argonService: ArgonService,
    ) { }

    async execute(id: string, refreshToken: string) {
        const user = await this.userRepository.findOneByOrFail({ id }).catch(() => {
            throw new UnauthorizedException("user not found!");
        });

        const isValid = await this.argonService.verifyRefereshToken(user.refreshToken, refreshToken);
        if (!isValid) throw new UnauthorizedException("refresh token mismatch!");

        return plainToInstance(UserPayloadDto, user);
    }
}
