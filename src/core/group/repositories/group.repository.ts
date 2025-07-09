import { Group } from "src/core/group/entities/group.entity";
import { GroupORM } from "src/infrastructure/database/typeorm/entities/group.orm-entity";

export abstract class GroupRepository {
  abstract findAll(): Promise<Group[]>;
  abstract findById(id: string): Promise<Group | null>;
  abstract findGroupByMemberId(userId: string): Promise<Group>;
  abstract findOneByIdOrThrow(id: string): Promise<Group>;
  abstract create(group: Partial<Group>): Group;
  abstract findOneBy(where: Partial<Group>): Promise<Group | null>;
  abstract findOneByOrFail(where: Partial<Group>): Promise<Group>;
  abstract find(options: object): Promise<Group[]>;
  abstract save(group: Partial<GroupORM>): Promise<GroupORM>;
  abstract remove(group: Group): Promise<Group>;
  abstract update(group: Group): Promise<Group>;
}