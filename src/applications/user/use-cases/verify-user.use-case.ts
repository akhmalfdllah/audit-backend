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
        let user;

        try {
            user = await this.userRepository.findOneByOrFail({ username: dto.username });
        } catch (error) {
            if (error instanceof EntityNotFoundError) {
                throw new BadRequestException("invalid username or password!");
            }
            throw error;
        }

        const isValid = await this.argonService.verifyPassword(user.password, dto.password);
        if (!isValid) {
            throw new BadRequestException("invalid username or password!");
        }

        return plainToInstance(UserPayloadDto, user);
    }
}
