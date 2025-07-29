import {
    Injectable,
    ConflictException,
    NotFoundException,
} from "@nestjs/common";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity";

@Injectable()
export class DeleteUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(id: string): Promise<void> {
        let user;
        try {
            user = await this.userRepository.findOneByOrFail({ id });
        } catch {
            throw new NotFoundException("user not found!");
        }

        try {
            await this.userRepository.remove(user);
        } catch {
            throw new ConflictException(
                "unable to delete this record due to existing references in related tables.",
            );
        }
    }
}
