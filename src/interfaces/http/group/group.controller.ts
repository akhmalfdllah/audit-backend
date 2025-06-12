import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { TokenGuard, EnsureValid } from "src/shared/decorators/common.decorator";
import { groupDocs } from "src/modules/group/group.docs";
import { GroupService } from "src/modules/group/group.service";
import { createGroupBodySchema, CreateGroupBodyDto } from "src/modules/group/dto/create-group-body.dto";
import { updateGroupBodySchema, UpdateGroupBodyDto } from "src/modules/group/dto/update-group-body.dto";
import {
  searchGroupQuerySchema,
  SearchGroupQueryTransformed,
  SearchGroupQueryDto,
} from "src/modules/group/dto/search-group-query.dto";

@ApiBearerAuth()
@Controller("group")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation(groupDocs.post_group)
  @TokenGuard(["root", "developer"])
  @EnsureValid(createGroupBodySchema, "body")
  create(@Body() createGroupBodyDto: CreateGroupBodyDto) {
    return this.groupService.save(createGroupBodyDto);
  }

  @Get()
  @ApiOperation(groupDocs.get_group)
  @TokenGuard(["root", "developer"])
  @EnsureValid(searchGroupQuerySchema, "query")
  findAll(@Query() searchGroupQueryDto: SearchGroupQueryDto) {
    const searchGroupQuery = searchGroupQueryDto as unknown as SearchGroupQueryTransformed;
    return this.groupService.findAll(searchGroupQuery);
  }

  @Get(":id")
  @ApiOperation(groupDocs.get_groupId)
  @TokenGuard(["root", "developer"])
  findOne(@Param("id") id: string) {
    return this.groupService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation(groupDocs.patch_groupId)
  @TokenGuard(["root", "developer"])
  @EnsureValid(updateGroupBodySchema, "body")
  update(@Param("id") id: string, @Body() updateGroupBodyDto: UpdateGroupBodyDto) {
    return this.groupService.updated(id, updateGroupBodyDto);
  }

  @Delete(":id")
  @ApiOperation(groupDocs.delete_groupId)
  @TokenGuard(["root", "developer"])
  remove(@Param("id") id: string) {
    return this.groupService.remove(id);
  }
}
