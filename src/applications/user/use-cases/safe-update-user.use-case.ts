import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { ArgonService } from "src/shared/services/argon.service";
import { SafeUpdateBodyDto } from "src/applications/user/dto/safe-update-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { isMatch, isNotMatch } from "src/shared/utils/common.util";

@Injectable()
export class SafeUpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly argonService: ArgonService,
    ) { }

    async execute(id: string, dto: SafeUpdateBodyDto) {
        const { password, confirmPassword, ...safeUpdateDto } = dto;
        if (isNotMatch(password, confirmPassword)) throw new BadRequestException("confirm password not match!");

        const user = await this.userRepository.findOneByOrFail({ id }).catch(() => {
            throw new NotFoundException("user not found!");
        });

        const hashPassword = await this.argonService.hashPassword(password);
        const saved = await this.userRepository.save({ ...user, ...safeUpdateDto, password: hashPassword });
        return plainToInstance(UserPayloadDto, saved);
    }
}