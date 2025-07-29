import { Injectable } from "@nestjs/common";
import { CreateGroupBodyDto } from "src/applications/group/dto/create-group-body.dto";
import { UpdateGroupBodyDto } from "src/applications/group/dto/update-group-body.dto";
import {
    CreateGroupUseCase,
    DeleteGroupUseCase,
    FindAllGroupsUseCase,
    FindGroupByIdUseCase,
    UpdateGroupUseCase
} from "src/applications/group/use-cases/common.use-case";
import { DecodedUser } from "src/types/jwt.type";

@Injectable()
export class GroupFacadeService {
    constructor(
        private readonly createGroupUseCase: CreateGroupUseCase,
        private readonly deleteGroupUseCase: DeleteGroupUseCase,
        private readonly findAllGroupUseCase: FindAllGroupsUseCase,
        private readonly findOneGroupUseCase: FindGroupByIdUseCase,
        private readonly updateGroupUseCase: UpdateGroupUseCase
    ) { }

    async save(dto: CreateGroupBodyDto){
        return this.createGroupUseCase.execute(dto);
    }

    async update(id: string, payload: UpdateGroupBodyDto) {
        return this.updateGroupUseCase.execute(id, payload);
    }

    async remove(id: string) {
        return this.deleteGroupUseCase.execute(id);
    }

    async findAll() {
        return this.findAllGroupUseCase.execute();
    }

    async findOne(id: string) {
        return this.findOneGroupUseCase.execute(id);
    }
}
