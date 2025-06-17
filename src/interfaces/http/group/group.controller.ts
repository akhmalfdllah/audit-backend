import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { TokenGuard, EnsureValid } from "src/shared/decorators/common.decorator";
import { groupDocs } from "src/interfaces/http/group/group.docs";
import { GroupFacadeService } from "src/interfaces/http/group/group.facade.service";
import { createGroupBodySchema, CreateGroupBodyDto } from "src/applications/group/dto/create-group-body.dto";
import { updateGroupBodySchema, UpdateGroupBodyDto } from "src/applications/group/dto/update-group-body.dto";
import {
  searchGroupQuerySchema,
  SearchGroupQueryTransformed,
  SearchGroupQueryDto,
} from "src/applications/group/dto/search-group-query.dto";

@ApiBearerAuth()
@Controller("group")
export class GroupController {
  constructor(private readonly groupFacade: GroupFacadeService) { }

  @Post()
  @ApiOperation(groupDocs.post_group)
  @TokenGuard(["admin"])
  @EnsureValid(createGroupBodySchema, "body")
  create(@Body() createGroupBodyDto: CreateGroupBodyDto) {
    return this.groupFacade.save(createGroupBodyDto);
  }

  @Get()
  @ApiOperation(groupDocs.get_group)
  @TokenGuard(["admin"])
  @EnsureValid(searchGroupQuerySchema, "query")
  async findAll(@Query() searchGroupQueryDto: SearchGroupQueryDto) {
    const searchGroupQuery = searchGroupQueryDto as unknown as SearchGroupQueryTransformed;
    return this.groupFacade.findAll(searchGroupQuery);
  }

  @Get(":id")
  @ApiOperation(groupDocs.get_groupId)
  @TokenGuard(["admin"])
  findOne(@Param("id") id: string) {
    return this.groupFacade.findOne(id);
  }

  @Patch(":id")
  @ApiOperation(groupDocs.patch_groupId)
  @TokenGuard(["admin"])
  @EnsureValid(updateGroupBodySchema, "body")
  update(@Param("id") id: string, @Body() updateGroupBodyDto: UpdateGroupBodyDto) {
    return this.groupFacade.update(id, updateGroupBodyDto);
  }

  @Delete(":id")
  @ApiOperation(groupDocs.delete_groupId)
  @TokenGuard(["admin"])
  remove(@Param("id") id: string) {
    return this.groupFacade.remove(id);
  }
}
