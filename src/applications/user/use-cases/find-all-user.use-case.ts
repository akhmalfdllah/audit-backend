import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { SearchUserQueryTransformed } from "src/applications/user/dto/search-user-query.dto";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class FindAllUsersUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(searchDto: SearchUserQueryTransformed) {
        const where: any = {};

        if (searchDto.role) {
            where.role = searchDto.role;
        }

        if (searchDto.group) {
            // assume relation is "groups", many-to-many
            where.groups = { id: searchDto.group.id };
        }

        const users = await this.userRepository.find({ where });
        return plainToInstance(UserPayloadDto, users);
    }
}
