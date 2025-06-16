import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { ArgonService } from "src/shared/services/argon.service";
import { SafeUpdateBodyDto } from "src/applications/user/dto/safe-update-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { isNotMatch } from "src/shared/utils/common.util";

@Injectable()
export class SafeUpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly argonService: ArgonService,
    ) { }

    async execute(id: string, dto: SafeUpdateBodyDto) {
        if (!id) throw new BadRequestException("User ID is required.");
        const { password, confirmPassword } = dto;

        if (isNotMatch(password, confirmPassword)) {
            throw new BadRequestException("confirm password not match!");
        }

        let user;
        try {
            user = await this.userRepository.findOneByOrFail({ id });
        } catch {
            throw new NotFoundException("user not found!");
        }

        const hashedPassword = await this.argonService.hashPassword(password);

        const saved = await this.userRepository.save({
            ...user,
            password: hashedPassword,
        });

        return plainToInstance(UserPayloadDto, saved);
    }
}
