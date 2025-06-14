import { Injectable, BadRequestException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { ArgonService } from "src/shared/services/argon.service";
import { VerifyUserBodyDto } from "src/applications/user/dto/verify-user-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class VerifyUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly argonService: ArgonService,
    ) { }

    async execute(dto: VerifyUserBodyDto) {
        const user = await this.userRepository.findOneByOrFail({ username: dto.username }).catch(() => {
            throw new BadRequestException("invalid username or password!");
        });

        const isValid = await this.argonService.verifyPassword(user.password, dto.password);
        if (!isValid) throw new BadRequestException("invalid username or password!");

        return plainToInstance(UserPayloadDto, user);
    }
}