import { Injectable, BadRequestException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { ArgonService } from "src/shared/services/argon.service";
import { VerifyUserBodyDto } from "src/applications/user/dto/verify-user-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { EntityNotFoundError } from "typeorm";

@Injectable()
export class VerifyUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly argonService: ArgonService,
    ) { }

    async execute(dto: VerifyUserBodyDto) {
        console.log("📥 DTO Masuk:", dto);
        let user;

        try {
            user = await this.userRepository.findOneByOrFail({ email: dto.email });
            console.log("✅ User ditemukan:", user);
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new BadRequestException("invalid email or password!");
            }
            throw error;
        }
        console.log("🔐 Password hash:", user.password);
        console.log("🔍 Cek validitas password...");
        const isValid = await this.argonService.verifyPassword(user.password, dto.password);
        console.log("✅ Password valid?", isValid);
        if (!isValid) {
            throw new BadRequestException("invalid email or password!");
        }

        return plainToInstance(UserPayloadDto, user);
    }
}
