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

    async execute(id: string, updateUserDto: UpdateUserBodyTransformed) {
        const user = await this.userRepository.findOneByOrFail({ id }).catch(() => {
            throw new NotFoundException("user not found!");
        });

        if (updateUserDto.group) {
            const groupId = updateUserDto.group.id;
            const group = await this.groupRepository.findOneByOrFail({ id: groupId }).catch(() => {
                throw new NotFoundException("group not found!");
            });
            user.group = group;
        }

        const updated = await this.userRepository.update(id, { ...user, ...updateUserDto });
        return plainToInstance(UserPayloadDto, updated);
    }
}