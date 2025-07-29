import { Controller, Get, Body, Patch, Param, Query, UseInterceptors, Post, Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import {
    TokenGuard,
    EnsureValid,
} from 'src/shared/decorators/common.decorator';
import { User } from 'src/shared/decorators/params/user.decorator';
import { userDocs } from 'src/interfaces/http/user/user.docs';
import { UserFacadeService } from 'src/interfaces/http/user/user.facade.service';
import {
    updateSelfBodySchema,
    UpdateSelfBodyDto,
} from 'src/applications/user/dto/update-self-body.dto';
import {
    updateUserBodySchema,
    UpdateUserBodyTransformed,
    UpdateUserBodyDto,
} from 'src/applications/user/dto/update-user-body.dto';
import {
    searchUserQuerySchema,
    SearchUserQueryTransformed,
    SearchUserQueryDto,
} from 'src/applications/user/dto/search-user-query.dto';
import { DecodedUser } from 'src/types/jwt.type';
import { AuditLogInterceptor } from 'src/shared/interceptors/audit-log.interceptor';
import { UserPayloadDto } from 'src/applications/user/dto/user-payload.dto';
import {
    CreateUserBodyDto,
    createUserBodySchema,
} from 'src/applications/user/dto/create-user-body.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { AuditAction } from 'src/core/audit-log/entities/audit-log.entity';
import { AuditActionDecorator } from 'src/shared/decorators/audit-action.decorator';

@Controller('user')
@ApiBearerAuth()
@UseInterceptors(AuditLogInterceptor)
export class UserController {
    constructor(
        private readonly userFacade: UserFacadeService,
    ) { }

    @Post()
    @ApiOperation(userDocs.create_user)
    @TokenGuard(['admin'])
    @EnsureValid(createUserBodySchema, 'body')
    async createUser(
        @CurrentUser() user: UserPayloadDto,
        @Body() dto: CreateUserBodyDto,
    ) {
        return this.userFacade.create({
            ...dto,
            actorId: user.id, // ⬅️ penting untuk audit log
        });
    }

    @Get()
    @ApiOperation(userDocs.get_user)
    @TokenGuard(['admin'])
    @EnsureValid(searchUserQuerySchema, 'query')
    async findAll(@Query() searchUserQueryDto: SearchUserQueryDto) {
        const searchUserQuery =
            searchUserQueryDto as unknown as SearchUserQueryTransformed;
        return await this.userFacade.findAll(searchUserQuery);
    }

    @Patch('me')
    @TokenGuard(['admin', 'user', 'auditor'])
    @AuditActionDecorator(AuditAction.UPDATE_USER)
    @ApiOperation(userDocs.patch_user)
    @EnsureValid(updateSelfBodySchema, 'body')
    async updateMe(
        @CurrentUser() user: UserPayloadDto,
        @Body() dto: UpdateSelfBodyDto,
    ) {
        return this.userFacade.safeUpdate(user.id, dto); // actorId = user.id
    }

    @Get('/group')
    @ApiOperation(userDocs.get_userGroup)
    @TokenGuard(['admin'])
    async retrieveGroup(@User() user: DecodedUser) {
        return await this.userFacade.retrieveGroup(user.id);
    }

    @Get(':id')
    @ApiOperation(userDocs.get_userId)
    @TokenGuard(['admin'])
    async findOneUser(@Param('id') id: string): Promise<UserPayloadDto> {
        return this.userFacade.findOne(id); // ✅ sudah jadi DTO, tidak perlu mapping lagi
    }

    @Patch(':id')
    @TokenGuard(['admin'])
    @AuditActionDecorator(AuditAction.UPDATE_USER)
    @ApiOperation(userDocs.patch_user)
    @EnsureValid(updateUserBodySchema, 'body')
    async updateByAdmin(
        @Param('id') id: string,
        @CurrentUser() user: UserPayloadDto,
        @Body() updateUserBodyDto: UpdateUserBodyDto,
    ) {
        const transformed =updateUserBodyDto as unknown as UpdateUserBodyTransformed;

        return this.userFacade.update(id, {
            ...transformed,
            actorId: user.id, // ✅ ini sudah valid karena ada di tipe Transformed
        });
    }

    @Delete(':id')
    @TokenGuard(['admin'])
    @ApiOperation(userDocs.delete_user)
    async deleteUser(
        @Param('id') id: string,
        @CurrentUser() user: UserPayloadDto,
    ) {
        await this.userFacade.delete(id); // ← actorId = user.id
        return { message: 'User successfully deleted.' };
    }
}
