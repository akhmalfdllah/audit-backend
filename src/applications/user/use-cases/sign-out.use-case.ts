import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class SignOutUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, refreshToken: string) {
    const user = await this.userRepository.findOneByOrFail({ id, refreshToken }).catch(() => {
      throw new UnauthorizedException("invalid token!");
    });

    const updated = await this.userRepository.update(id, { refreshToken: null });
    return plainToInstance(UserPayloadDto, updated);
  }
}