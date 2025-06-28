// src/applications/user/use-cases/find-all-users.usecase.ts
import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/core/user/repositories/user.repository";
import { SearchUserQueryTransformed } from "src/applications/user/dto/search-user-query.dto";
import { plainToInstance } from "class-transformer";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";

@Injectable()
export class FindAllUsersUseCase {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(query: SearchUserQueryTransformed & {
        page?: number;
        limit?: number;
        keyword?: string;
    }) {
        const users = await this.userRepository.search(query);
        return plainToInstance(UserPayloadDto, users);
    }
}
