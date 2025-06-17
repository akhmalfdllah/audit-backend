import { Injectable } from "@nestjs/common";
import { CreateGroupBodyDto } from "src/applications/group/dto/create-group-body.dto";
import { SearchGroupQueryTransformed } from "src/applications/group/dto/search-group-query.dto";
import { UpdateGroupBodyDto } from "src/applications/group/dto/update-group-body.dto";
import {
    CreateGroupUseCase,
    DeleteGroupUseCase,
    FindAllGroupUseCase,
    FindOneGroupUseCase,
    UpdateGroupUseCase
} from "src/applications/group/use-cases/common.use-case";

@Injectable()
export class GroupFacadeService {
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
