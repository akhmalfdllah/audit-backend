// src/infrastructure/database/repositories/user.repository.impl.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserORM } from "src/infrastructure/database/typeorm/entities/user.orm-entity";
import { IUserRepository } from "src/core/user/repositories/user.repository";
import { User } from "src/core/user/entities/user.entity";
import { UserMapper } from "src/infrastructure/database/typeorm/mappers/user.mapper";

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
    constructor(
        @InjectRepository(UserORM)
        private readonly ormRepo: Repository<UserORM>
    ) { }

    async findById(id: string): Promise<User | null> {
        const userOrm = await this.ormRepo.findOne({ where: { id }, relations: ["group"] });
        return userOrm ? UserMapper.toDomain(userOrm) : null;
    }

    async findByUsername(username: string): Promise<User | null> {
        const userOrm = await this.ormRepo.findOne({ where: { username } });
        return userOrm ? UserMapper.toDomain(userOrm) : null;
    }

    async create(user: User): Promise<User> {
        const saved = await this.ormRepo.save(UserMapper.toORM(user));
        return UserMapper.toDomain(saved);
    }

    async update(user: User): Promise<User> {
        const saved = await this.ormRepo.save(UserMapper.toORM(user));
        return UserMapper.toDomain(saved);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }
}
