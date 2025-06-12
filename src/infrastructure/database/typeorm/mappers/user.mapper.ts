// src/infrastructure/database/mappers/user.mapper.ts
import { User } from "src/core/user/entities/user.entity";
import { UserORM } from "src/infrastructure/database/typeorm/entities/user.orm-entity";

export class UserMapper {
  static toDomain(orm: UserORM): User {
    return new User(
      orm.id,
      orm.username,
      orm.password,
      orm.role,
      orm.refreshToken,
      orm.group, // ✅ hanya ambil ID
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toORM(domain: User): UserORM {
    const orm = new UserORM();
    orm.id = domain.id;
    orm.username = domain.username;
    orm.password = domain.password;
    orm.group = domain.group;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    return orm;
  }
}
