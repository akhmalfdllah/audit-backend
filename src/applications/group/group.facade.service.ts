// src/applications/group/group.facade.ts

import { Injectable } from "@nestjs/common";
import { CreateGroupUseCase } from "./use-cases/create-group.use-case";
import { DeleteGroupUseCase } from "./use-cases/delete-group.use-case";
import { FindAllGroupUseCase } from "./use-cases/find-all-group.use-case";
import { FindOneGroupUseCase } from "./use-cases/find-one-group.use-case";
import { UpdateGroupUseCase } from "./use-cases/update-group.use-case";
import { CreateGroupBodyDto } from "./dto/create-group-body.dto";
import { UpdateGroupBodyDto } from "./dto/update-group-body.dto";
import { SearchGroupQueryTransformed } from "./dto/search-group-query.dto";

@Injectable()
export class GroupFacade {
    constructor(
        private readonly createGroupUseCase: CreateGroupUseCase,
        private readonly deleteGroupUseCase: DeleteGroupUseCase,
        private readonly findAllGroupUseCase: FindAllGroupUseCase,
        private readonly findOneGroupUseCase: FindOneGroupUseCase,
        private readonly updateGroupUseCase: UpdateGroupUseCase
    ) { }

    async save(payload: CreateGroupBodyDto) {
        return this.createGroupUseCase.execute(payload);
    }

    async update(id: string, payload: UpdateGroupBodyDto) {
        return this.updateGroupUseCase.execute(id, payload);
    }

    async remove(id: string) {
        return this.deleteGroupUseCase.execute(id);
    }

    async findAll(query: SearchGroupQueryTransformed) {
        return this.findAllGroupUseCase.execute(query);
    }

    async findOne(id: string) {
        return this.findOneGroupUseCase.execute(id);
    }
}
