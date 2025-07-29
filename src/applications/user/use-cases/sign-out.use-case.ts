import { Injectable, UnauthorizedException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity";

@Injectable()
export class SignOutUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly auditLogFacade: AuditLogFacade,
  ) { }

  async execute(id: string, refreshToken: string) {
    if (!id || !refreshToken) {
      throw new UnauthorizedException("Missing token or user ID.");
    }

    let user;
    try {
      user = await this.userRepository.findOneByOrFail({ id, refreshToken });
    } catch {
      throw new UnauthorizedException("invalid token!");
    }

    await this.userRepository.update(id, { hashedRefreshToken: null });

    const updatedUser = await this.userRepository.findOneByOrFail({ id });
    return plainToInstance(UserPayloadDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }
}

