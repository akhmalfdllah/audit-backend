import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { TokenGuard, EnsureValid } from "src/shared/decorators/common.decorator";
import { groupDocs } from "src/interfaces/http/group/group.docs";
import { GroupFacadeService } from "src/interfaces/http/group/group.facade.service";
import { createGroupBodySchema, CreateGroupBodyDto } from "src/applications/group/dto/create-group-body.dto";
import { updateGroupBodySchema, UpdateGroupBodyDto } from "src/applications/group/dto/update-group-body.dto";
import { UserPayloadDto } from "src/applications/user/dto/user-payload.dto";
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';


@ApiBearerAuth()
@Controller()
export class GroupController {
  constructor(private readonly groupFacade: GroupFacadeService) { }

  @Post("groups")
  @TokenGuard(["admin"])
  @EnsureValid(createGroupBodySchema, "body")
  async create(
    @Body() dto: CreateGroupBodyDto,
    @CurrentUser() user: UserPayloadDto,
  ) {
    return this.groupFacade.save(dto, user);
  }

  @Get()
  @ApiOperation(groupDocs.get_all_group)
  @TokenGuard(["admin"])
  async findAll() {
    return this.groupFacade.findAll();
  }

  @Get(":id")
  @ApiOperation(groupDocs.get_groupId)
  @TokenGuard(["admin"])
  findOne(@Param("id") id: string) {
    return this.groupFacade.findOne(id);
  }

  @Patch(":id")
  @TokenGuard(["admin"])
  @EnsureValid(updateGroupBodySchema, "body")
  @ApiOperation(groupDocs.get_groupId)
  async update(
    @Param("id") id: string,
    @Body() dto: UpdateGroupBodyDto
  ) {
    return this.groupFacade.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation(groupDocs.delete_groupId)
  @TokenGuard(["admin"])
  remove(@Param("id") id: string) {
    return this.groupFacade.remove(id);
  }
}
