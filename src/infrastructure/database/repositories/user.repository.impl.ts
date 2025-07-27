import { Injectable, BadRequestException } from "@nestjs/common";
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

  async updateHashedRefreshToken(userId: string, hashedToken: string): Promise<void> {
    console.log("➡️ Memperbarui hashedRefreshToken untuk user ID:", userId);
    await this.ormRepo.update(
      { id: userId },
      { hashedRefreshToken: hashedToken }
    );
    console.log("✅ hashedRefreshToken berhasil diupdate!");
  }

  // Di implementasi repository (infrastructure layer)
  async search(filter: SearchUserQueryTransformed): Promise<User[]> {
  const where: FindOptionsWhere<User>[] = [];

  // Jika ada keyword, cocokkan ke username, email, dan fullName (OR condition)
  if (filter.keyword) {
    const keywordLike = ILike(`%${filter.keyword}%`);
    where.push(
      { username: keywordLike },
      { email: keywordLike },
      { fullName: keywordLike }
    );
  }

  // Jika ada filter lain (role/status/group), kita tambahkan ke setiap kondisi where
  const roleCondition = filter.role ? { role: filter.role } : {};
  const statusCondition = filter.status ? { status: filter.status } : {};
  const groupCondition = filter.group?.id ? { group: { id: filter.group.id } } : {};

  // Gabungkan semua kondisi
  const finalWhere = where.length
    ? where.map(condition => ({
        ...condition,
        ...roleCondition,
        ...statusCondition,
        ...groupCondition,
      }))
    : [
        {
          ...roleCondition,
          ...statusCondition,
          ...groupCondition,
        },
      ];

  // Validasi: minimal satu filter harus diisi
  if (
    !filter.keyword &&
    !filter.role &&
    !filter.status &&
    !filter.group?.id
  ) {
    throw new BadRequestException('Minimal satu filter harus diisi');
  }

  // Validasi pagination
  const limit = Number(filter.limit) || 10;
  const page = Number(filter.page) || 1;
  if (isNaN(limit) || isNaN(page)) {
    throw new BadRequestException('Parameter page dan limit harus berupa angka');
  }

  return this.ormRepo.find({
    where: finalWhere,
    relations: ['group'],
    take: limit,
    skip: (page - 1) * limit,
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

  async findAllByGroupId(groupId: string): Promise<User[]> {
  return this.ormRepo.find({ where: { group: { id: groupId } } });
}

  async find(options: FindManyOptions<User>): Promise<User[]> {
    const ormUsers = await this.ormRepo.find({ 
      ...options,
      select: ['id', 'username', 'hashedRefreshToken'], // ✅ sesuai dengan ORM
      relations,
    });
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