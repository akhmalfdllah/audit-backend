import {
    Injectable,
    BadRequestException, NotFoundException
} from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { ArgonService } from "src/shared/services/argon.service";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { isNotMatch } from "src/shared/utils/common.util";

@Injectable()
export class ChangePasswordUseCase {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly argonService: ArgonService,
    ) { }

    async execute(userId: string, currentPassword: string, newPassword: string, confirmPassword: string) {

        // pastikan konfirmasi sama
        if (isNotMatch(newPassword, confirmPassword)) {
            throw new BadRequestException("Confirm password not match!");
        }

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundException('User tidak ditemukan');
        }
        // verifikasi password lama
        const isValid = await this.argonService.verifyPassword(
            user.password,
            currentPassword,
        );
        if (!isValid) {
            throw new BadRequestException("Password saat ini salah!");
        }

        // pastikan password baru beda dengan yang lama
        const isSame = await this.argonService.verifyPassword(
            user.password,
            newPassword,
        );
        if (isSame) {
            throw new BadRequestException(
                "Password baru tidak boleh sama dengan password lama!",
            );
        }

        // hash password baru
        const hashedPassword = await this.argonService.hashPassword(newPassword);

        // simpan
        const saved = await this.userRepository.save({
            ...user,
            password: hashedPassword,
        });

        return plainToInstance(UserPayloadDto, saved, {
            excludeExtraneousValues: true,
        });
    }
}
