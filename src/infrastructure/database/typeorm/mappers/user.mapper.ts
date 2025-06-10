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
      orm.group?.id, // ✅ hanya ambil ID
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toORM(user: User): UserORM {
    const orm = new UserORM();
    orm.id = user.id;
    orm.username = user.username;
    orm.password = user.password;
    orm.role = user.role;
    orm.refreshToken = user.refreshToken;
    orm.group = { id: user.groupId } as any; // ⚠️ gunakan lazy reference
    return orm;
  }
}
