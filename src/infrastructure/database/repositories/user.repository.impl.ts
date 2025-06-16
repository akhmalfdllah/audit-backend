import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOptionsRelations, FindManyOptions, FindOptionsWhere } from "typeorm";
import { UserORM } from "src/infrastructure/database/typeorm/entities/user.orm-entity";
import { User } from "src/core/user/entities/user.entity";
import { UserRepository as AbstractUserRepo } from "src/core/user/repositories/user.repository";
import { UserMapper } from "src/infrastructure/database/typeorm/mappers/user.mapper";

@Injectable()
export class UserRepositoryImpl implements AbstractUserRepo {
  constructor(
    @InjectRepository(UserORM)
    private readonly ormRepo: Repository<UserORM>,
  ) {}
  async findOneBy(where: FindOptionsWhere<User>): Promise<User | null> {
    const ormUser = await this.ormRepo.findOne({ where, relations });
    return ormUser ? UserMapper.toDomain(ormUser) : null;
  }

  async findOneByOrFail(where: Partial<User>): Promise<User> {
    const ormUser = await this.ormRepo.findOneOrFail({ where, relations });
    return UserMapper.toDomain(ormUser);
  }

  async find(options: FindManyOptions<User>): Promise<User[]> {
    const ormUsers = await this.ormRepo.find({ ...options, relations });
    return ormUsers.map(UserMapper.toDomain);
  }

    async save(user: Partial<User>): Promise<User> {
    const ormUser = UserMapper.toORM(user as User); // mapping langsung
    const saved = await this.ormRepo.save(ormUser);
    return UserMapper.toDomain(saved);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const ormUser = UserMapper.toORM({ ...user, id } as User);
    await this.ormRepo.update(id, ormUser);
    const updated = await this.ormRepo.findOneOrFail({ where: { id }, relations });
    return UserMapper.toDomain(updated);
  }

  async remove(user: User): Promise<User> {
    const ormUser = await this.ormRepo.findOneOrFail({ where: { id: user.id }});
    const removed = await this.ormRepo.remove(ormUser);
    return UserMapper.toDomain(removed);
  }

}

export const relations: FindOptionsRelations<UserORM> = {
  groups: true
}