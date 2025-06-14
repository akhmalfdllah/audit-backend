import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class UpdateRefreshTokenUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(user: UserPayloadDto, refreshToken: string) {
        const updated = await this.userRepository.save({ ...user, refreshToken });
        return plainToInstance(UserPayloadDto, updated);
    }
}