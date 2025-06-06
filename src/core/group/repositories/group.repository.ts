import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsRelations, Repository } from "typeorm";
import { Group } from "src/core/group/entities/group.entity";

@Injectable()
export class GroupRepository extends Repository<Group> {
  constructor(
    @InjectRepository(Group)
    protected repository: Repository<Group>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}

export const relations: FindOptionsRelations<Group> = {
  members: true,
  //apps: true,
};
