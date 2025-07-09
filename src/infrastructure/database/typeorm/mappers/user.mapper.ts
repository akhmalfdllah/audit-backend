// src/infrastructure/database/mappers/user.mapper.ts

import { User } from "src/core/user/entities/user.entity";
import { UserORM } from "src/infrastructure/database/typeorm/entities/user.orm-entity";
import { GroupORMMapper } from "src/infrastructure/database/typeorm/mappers/group.mapper"; // ✅ gunakan versi infrastructure

export class UserORMMapper {
  static toDomain(orm: UserORM): User {
    return new User(
      orm.id,
      orm.username,
      orm.password,
      orm.role,
      orm.status,
      orm.fullName,
      orm.email,
      orm.group ? GroupORMMapper.toDomain(orm.group) : null,
      orm.createdAt,
      orm.updatedAt,
      orm.hashedRefreshToken,
    );
  }

  static toOrm(domain: User): UserORM {
    const orm = new UserORM();
    orm.id = domain.id;
    orm.username = domain.username;
    orm.password = domain.password;
    orm.role = domain.role;
    orm.fullName = domain.fullName;
    orm.email = domain.email;
    orm.group = domain.group ? GroupORMMapper.toOrm(domain.group): null;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    orm.hashedRefreshToken = domain.hashedRefreshToken;
    return orm;
  }
}
