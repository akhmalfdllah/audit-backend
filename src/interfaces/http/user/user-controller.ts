import { Controller, Get, Body, Patch, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { TokenGuard, EnsureValid } from "src/shared/decorators/common.decorator";
import { User } from "src/shared/decorators/params/user.decorator";
import { userDocs } from "src/interfaces/http/user/user.docs";
import { UserService } from "src/interfaces/http/user/user.service";
import { safeUpdateBodySchema, SafeUpdateBodyDto } from "src/interfaces/http/user/dto/safe-update-body.dto";
import {
    updateUserBodySchema,
    UpdateUserBodyTransformed,
    UpdateUserBodyDto,
} from "src/interfaces/http/user/dto/update-user-body.dto";
import {
    searchUserQuerySchema,
    SearchUserQueryTransformed,
    SearchUserQueryDto,
} from "src/interfaces/http/user/dto/search-user-query.dto";
import { DecodedUser } from "src/types/jwt.type";

@Controller("user")
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiOperation(userDocs.get_user)
    @TokenGuard(["admin"])
    @EnsureValid(searchUserQuerySchema, "query")
    async findAll(@Query() searchUserQueryDto: SearchUserQueryDto) {
        const searchUserQuery = searchUserQueryDto as unknown as SearchUserQueryTransformed;
        return await this.userService.findAll(searchUserQuery);
    }

    @Patch()
    @ApiOperation(userDocs.patch_user)
    @TokenGuard(["admin"])
    @EnsureValid(safeUpdateBodySchema, "body")
    async safeUpdate(@User() user: DecodedUser, @Body() safeUpdateBodyDto: SafeUpdateBodyDto) {
        return await this.userService.safeUpdate(user.id, safeUpdateBodyDto);
    }

    @Get("group")
    @ApiOperation(userDocs.get_userGroup)
    @TokenGuard()
    async retrieveGroup(@User() user: DecodedUser) {
        return await this.userService.retrieveGroup(user.id);
    }

    @Get(":id")
    @ApiOperation(userDocs.get_userId)
    @TokenGuard(["admin"])
    async findOne(@Param("id") id: string) {
        return await this.userService.findOne(id);
    }

    @Patch(":id")
    @ApiOperation(userDocs.patch_userId)
    @TokenGuard(["admin"])
    @EnsureValid(updateUserBodySchema, "body")
    async update(@Param("id") id: string, @Body() updateUserBodyDto: UpdateUserBodyDto) {
        const updateUserBody = updateUserBodyDto as unknown as UpdateUserBodyTransformed;
        return await this.userService.update(id, updateUserBody);
    }
}
