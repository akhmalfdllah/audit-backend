import { Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { SearchUserQueryTransformed } from "src/applications/user/dto/search-user-query.dto";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class FindAllUsersUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(searchDto: SearchUserQueryTransformed) {
        const users = await this.userRepository.find({ where: searchDto });
        return plainToInstance(UserPayloadDto, users);
    }
}