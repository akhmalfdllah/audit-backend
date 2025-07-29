import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ArgonService } from "src/shared/services/argon.service";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { UpdateUserBodyTransformed } from "src/applications/user/dto/update-user-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { Group } from "src/core/group/entities/group.entity";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly groupRepository: GroupRepository,
        private readonly argonService: ArgonService,
    ) { }

    async execute(id: string, dto: UpdateUserBodyTransformed) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException("user not found");

        const { password, confirmPassword, groupId, actorId, ...rest } = dto;

        // ✅ Validasi password
        let newPassword = undefined;
        const isPasswordFilled = password && password !== "string";

        if (isPasswordFilled) {
            if (password !== confirmPassword) {
                throw new BadRequestException("confirm password not match");
            }

            const isSame = await this.argonService.verifyPassword(user.password, password);
            if (isSame) {
                throw new BadRequestException("new password must be different");
            }

            newPassword = await this.argonService.hashPassword(password);
        }

        // ✅ Resolusi group baru jika diberikan
        let group: Group = user.group;
        if (groupId !== undefined && groupId !== null) {
            const resolvedGroupId =
                typeof groupId === "object" ? groupId.id : groupId;
            group = await this.groupRepository.findOneByIdOrThrow(resolvedGroupId);
        }

        // ✅ Filter hanya nilai yang valid dan berubah dari sebelumnya
        const updateData: Partial<typeof user> = {};
        Object.entries(rest).forEach(([key, value]) => {
            if (
                value !== undefined &&
                value !== "string" &&
                value !== user[key]
            ) {
                updateData[key] = value;
            }
        });

        // ✅ Tambahkan group dan password jika perlu
        updateData.group = group;
        if (newPassword) updateData.password = newPassword;

        const updated = await this.userRepository.save({
            ...user,
            ...updateData,
        });

        return plainToInstance(UserPayloadDto, updated, {
            excludeExtraneousValues: true,
        });
    }
}
