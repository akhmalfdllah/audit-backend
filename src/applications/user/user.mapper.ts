// src/applications/user/mappers/user.mapper.ts

import { User } from "src/core/user/entities/user.entity";
import { UserPayloadDto, transformLinks } from "src/applications/user/dto/user-payload.dto";
import { plainToInstance } from "class-transformer";

export class UserMapper {
    static toPayload(user: User): UserPayloadDto {
        const raw: Partial<UserPayloadDto> = {
            id: user.id,
            username: user.username,
            role: user.role,
            status: user.status,
            group: user.group ? { id: user.group[0].id, name: user.group[0].name } : null,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            _action: [], // bisa isi berdasarkan peran/izin
            _link: transformLinks(user),
        };

        return plainToInstance(UserPayloadDto, raw, {
            excludeExtraneousValues: true,
        });
    }
}
