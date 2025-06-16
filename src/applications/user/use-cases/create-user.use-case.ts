import { BadRequestException, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ArgonService } from "src/shared/services/argon.service";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { CreateUserBodyDto } from "src/applications/user/dto/create-user-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly argonService: ArgonService,
  ) { }

  async execute({ username, confirmPassword, ...bodyDto }: CreateUserBodyDto) {
    const user = await this.userRepository.findOneBy({ username });
    if (bodyDto.password !== confirmPassword) throw new BadRequestException("confirm password not match!");
    if (user) throw new BadRequestException("user already exists!");

    const password = await this.argonService.hashPassword(bodyDto.password);
    const saved = await this.userRepository.save({ ...bodyDto, username, password });
    return plainToInstance(UserPayloadDto, saved);
  }
}