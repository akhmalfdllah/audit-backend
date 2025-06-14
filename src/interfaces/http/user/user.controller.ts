import { Controller, Get, Body, Patch, Param, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { TokenGuard, EnsureValid } from "src/shared/decorators/common.decorator";
import { User } from "src/shared/decorators/params/user.decorator";
import { userDocs } from "src/interfaces/http/user/user.docs";
import { UserFacadeService } from "src/applications/user/user.facade.service";
import { safeUpdateBodySchema, SafeUpdateBodyDto } from "src/applications/user/dto/safe-update-body.dto";
import {
    updateUserBodySchema,
    UpdateUserBodyTransformed,
    UpdateUserBodyDto,
} from "src/applications/user/dto/update-user-body.dto";
import {
    searchUserQuerySchema,
    SearchUserQueryTransformed,
    SearchUserQueryDto,
} from "src/applications/user/dto/search-user-query.dto";
import { DecodedUser } from "src/types/jwt.type";

@Controller("user")
@ApiBearerAuth()
export class UserController {
    constructor(private readonly userFacade: UserFacadeService) { }

    @Get()
    @ApiOperation(userDocs.get_user)
    @TokenGuard(["admin"])
    @EnsureValid(searchUserQuerySchema, "query")
    async findAll(@Query() searchUserQueryDto: SearchUserQueryDto) {
        const searchUserQuery = searchUserQueryDto as unknown as SearchUserQueryTransformed;
        return await this.userFacade.findAll(searchUserQuery);
    }

    @Patch()
    @ApiOperation(userDocs.patch_user)
    @TokenGuard(["admin"])
    @EnsureValid(safeUpdateBodySchema, "body")
    async safeUpdate(@User() user: DecodedUser, @Body() safeUpdateBodyDto: SafeUpdateBodyDto) {
        return await this.userFacade.safeUpdate(user.id, safeUpdateBodyDto);
    }

    @Get("group")
    @ApiOperation(userDocs.get_userGroup)
    @TokenGuard()
    async retrieveGroup(@User() user: DecodedUser) {
        return await this.userFacade.retrieveGroup(user.id);
    }

    @Get(":id")
    @ApiOperation(userDocs.get_userId)
    @TokenGuard(["admin"])
    async findOne(@Param("id") id: string) {
        return await this.userFacade.findOne(id);
    }

    @Patch(":id")
    @ApiOperation(userDocs.patch_userId)
    @TokenGuard(["admin"])
    @EnsureValid(updateUserBodySchema, "body")
    async update(@Param("id") id: string, @Body() updateUserBodyDto: UpdateUserBodyDto) {
        const updateUserBody = updateUserBodyDto as unknown as UpdateUserBodyTransformed;
        return await this.userFacade.update(id, updateUserBody);
    }
}
