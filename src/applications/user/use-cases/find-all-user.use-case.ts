// src/applications/user/use-cases/find-all-users.usecase.ts
import { Injectable, NotFoundException } from "@nestjs/common";
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
        if (users.length === 0) {
            if (query.role) {
                throw new NotFoundException(`Tidak ditemukan user dengan role: ${query.role}`);
            } else if (query.status) {
                throw new NotFoundException(`Tidak ditemukan user dengan status: ${query.status}`);
            } else if (query.keyword) {
                throw new NotFoundException(`Tidak ditemukan user dengan keyword: ${query.keyword}`);
            } else {
                throw new NotFoundException(`Tidak ditemukan user.`);
            }
        }
        return plainToInstance(UserPayloadDto, users);
    }
}
