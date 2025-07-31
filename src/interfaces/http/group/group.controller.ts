import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseUUIDPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { TokenGuard, EnsureValid } from "src/shared/decorators/common.decorator";
import { groupDocs } from "src/interfaces/http/group/group.docs";
import { GroupFacadeService } from "src/interfaces/http/group/group.facade.service";
import { createGroupBodySchema, CreateGroupBodyDto } from "src/applications/group/dto/create-group-body.dto";
import { updateGroupBodySchema, UpdateGroupBodyDto } from "src/applications/group/dto/update-group-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AuditLogInterceptor } from "src/shared/interceptors/audit-log.interceptor";
import { AuditActionDecorator } from "src/shared/decorators/audit-action.decorator";
import { AuditAction } from "src/core/audit-log/entities/audit-log.entity";
import { sanitize } from "src/shared/utils/sanitize";

@ApiBearerAuth()
@Controller()
@UseInterceptors(AuditLogInterceptor)
export class GroupController {
  constructor(private readonly groupFacade: GroupFacadeService) { }

  @Post("groups")
  @TokenGuard(["Admin"])
  @EnsureValid(createGroupBodySchema, "body")
  @AuditActionDecorator(AuditAction.CREATE_GROUP) // ⬅️ Audit otomatis
  async create(
    @Body() dto: CreateGroupBodyDto,
  ) {
    return this.groupFacade.save(dto); // ⬅️ cukup 1 argumen
  }


  @Get('all')
  @ApiOperation(groupDocs.get_all_group)
  @TokenGuard(["Admin"])
  async findAll() {
    return this.groupFacade.findAll();
  }


  @Patch(':id')
  @TokenGuard(['Admin'])
  @AuditActionDecorator(AuditAction.UPDATE_GROUP)
  @ApiOperation(groupDocs.get_groupId)
  @EnsureValid(updateGroupBodySchema, 'body')
  async updateGroup(
    @Param('id') groupId: string,
    @Body() dto: UpdateGroupBodyDto,
  ) {
    const sanitizedDto = sanitize(dto);
    return this.groupFacade.update(groupId, sanitizedDto);
  }

  @Delete(":id")
  @TokenGuard(["Admin"])
  @ApiOperation(groupDocs.delete_groupId)
  @AuditActionDecorator(AuditAction.DELETE_GROUP)
  async remove(@Param("id") id: string) {
    return this.groupFacade.remove(id);
  }
  @Get(":id")
  @ApiOperation(groupDocs.get_groupId)
  @TokenGuard(["Admin"])
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.groupFacade.findOne(id);
  }
}
