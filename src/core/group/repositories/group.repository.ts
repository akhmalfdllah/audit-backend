import { Group } from "src/core/group/entities/group.entity";

export abstract class IGroupRepository {
  abstract findById(id: string): Promise<Group | null>;
  abstract findByName(name: string): Promise<Group | null>;
  abstract create(group: Group): Promise<Group>;
  abstract update(group: Group): Promise<Group>;
  abstract delete(id: string): Promise<void>;
}