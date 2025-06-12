import { Group } from "src/core/group/entities/group.entity";

export abstract class GroupRepository {
  abstract create(group: Partial<Group>): Group;
  abstract findOneBy(where: Partial<Group>): Promise<Group | null>;
  abstract findOneByOrFail(where: Partial<Group>): Promise<Group>;
  abstract find(options: object): Promise<Group[]>;
  abstract save(group: Partial<Group>): Promise<Group>;
  abstract remove(group: Group): Promise<Group>;
  abstract update(id: string, group: Partial<Group>): Promise<Group>;
}