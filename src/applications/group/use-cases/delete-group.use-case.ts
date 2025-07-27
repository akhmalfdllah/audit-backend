import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
    BadRequestException,
} from "@nestjs/common";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { UserRepository } from "src/core/user/repositories/user.repository"; // Tambahkan import ini

@Injectable()
export class DeleteGroupUseCase {
    constructor(
        private readonly groupRepo: GroupRepository,
        private readonly userRepo: UserRepository, // Inject repository user
    ) { }

    async execute(groupId: string) {
        const existing = await this.groupRepo.findById(groupId);
        if (!existing) throw new NotFoundException("Group not found");

        // ✅ Cek apakah ada user yang masih terhubung ke group ini
        const usersInGroup = await this.userRepo.findAllByGroupId(groupId); // kamu harus pastikan method ini ada di UserRepository

        if (usersInGroup.length > 0) {
            throw new BadRequestException(
                `Group tidak bisa dihapus karena masih digunakan oleh ${usersInGroup.length} user`
            );
        }

        try {
            await this.groupRepo.remove(existing);
            console.log("Group deleted successfully");
            return { message: "Group deleted successfully" };
        } catch (error) {
            console.error("Gagal delete group:", error);
            throw new InternalServerErrorException("Failed to delete group");
        }
    }
}
