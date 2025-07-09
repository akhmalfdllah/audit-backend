import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOptionsRelations, FindManyOptions, FindOptionsWhere, ILike } from "typeorm";
import { UserORM } from "src/infrastructure/database/typeorm/entities/user.orm-entity";
import { User, UserRole, UserStatus } from "src/core/user/entities/user.entity";
import { UserORMMapper } from "src/infrastructure/database/typeorm/mappers/user.mapper";
import { SearchUserQueryTransformed } from "src/applications/user/dto/search-user-query.dto";


@Injectable()
export class UserRepositoryImpl {
  constructor(
    @InjectRepository(UserORM)
    private readonly ormRepo: Repository<UserORM>,
  ) { }
  async findOneBy(where: FindOptionsWhere<User>): Promise<User | null> {
    const ormUser = await this.ormRepo.findOne({ where, relations });
    return ormUser ? UserORMMapper.toDomain(ormUser) : null;
  }

  // Di implementasi repository (infrastructure layer)
  async search(filter: SearchUserQueryTransformed): Promise<User[]> {
    const where: FindOptionsWhere<User> = {};

    if (filter.keyword) {
      where.username = ILike(`%${filter.keyword}%`);
    }

    if (filter.role) where.role = filter.role;
    if (filter.group) where.group = { id: filter.group.id };

    return this.ormRepo.find({
      where,
      relations: ['groups'],
      take: filter.limit,
      skip: (filter.page - 1) * filter.limit,
    });
  }
  async findByApiKey(apiKey: string): Promise<User | null> {
    const result = await this.ormRepo.findOne(
      {
        where:
        {
          apiKey, role: UserRole.ERP,       // ✅ benar
          status: UserStatus.Active
        }
      });
    return result ? UserORMMapper.toDomain(result) : null;
  }

  async findOneByOrFail(where: Partial<User>): Promise<User> {
    const ormUser = await this.ormRepo.findOneOrFail({ where, relations });
    return UserORMMapper.toDomain(ormUser);
  }

  async find(options: FindManyOptions<User>): Promise<User[]> {
    const ormUsers = await this.ormRepo.find({ ...options, relations });
    return ormUsers.map(UserORMMapper.toDomain);
  }

  async save(user: Partial<User>): Promise<User> {
    const ormUser = UserORMMapper.toOrm(user as User); // mapping langsung
    const saved = await this.ormRepo.save(ormUser);
    return UserORMMapper.toDomain(saved);
  }

  async update(id: string, data: Partial<UserORM>): Promise<void> {
    await this.ormRepo.update({ id }, data);
}

  async remove(user: User): Promise<User> {
    const ormUser = await this.ormRepo.findOneOrFail({ where: { id: user.id } });
    const removed = await this.ormRepo.remove(ormUser);
    return UserORMMapper.toDomain(removed);
  }

}

export const relations: FindOptionsRelations<UserORM> = {
  group: true
}