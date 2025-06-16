import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { UpdateUserBodyTransformed } from "src/applications/user/dto/update-user-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly groupRepository: GroupRepository,
    ) { }

    async execute(id: string, dto: UpdateUserBodyTransformed) {
        const user = await this.userRepository.findOneByOrFail({ id }).catch(() => {
            throw new NotFoundException("user not found!");
        });

        // Handle update group
        if (dto.group === null) {
            user.groups = [];
        } else if (dto.group) {
            const group = await this.groupRepository.findOneByOrFail({ id: dto.group.id }).catch(() => {
                throw new NotFoundException("group not found!");
            });
            user.groups = [group];
        }

        if (dto.role) {
            user.role = dto.role;
        }

        const updated = await this.userRepository.save(user); // save lebih aman untuk relasi
        return plainToInstance(UserPayloadDto, updated);
    }
}
