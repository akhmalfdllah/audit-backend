import { Injectable } from "@nestjs/common";
import { AuditLogFacade } from "src/interfaces/http/audit-log/audit-log.facade";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity";
import { CreateGroupBodyDto } from "src/applications/group/dto/create-group-body.dto";
import { GroupORMMapper } from "src/infrastructure/database/typeorm/mappers/group.mapper";
import { GroupRepository } from "src/core/group/repositories/group.repository";

@Injectable()
export class CreateGroupUseCase {
  constructor(
    private readonly repo: GroupRepository,
    private readonly auditLogFacade: AuditLogFacade
  ) { }

  async execute(dto: CreateGroupBodyDto, actor: { id: string }) {
    const group = GroupORMMapper.fromCreateDto(dto);
    const saved = await this.repo.save(group);

    await this.auditLogFacade.create({
      actorId: actor.id,
      action: AuditAction.CREATE_GROUP,
      targetEntity: "Group",
      targetId: saved.id,
      metadata: { name: saved.name, type: saved.type }
    });

    return GroupORMMapper.toDomainResponse(saved); // ✅ BENAR
  }
}
