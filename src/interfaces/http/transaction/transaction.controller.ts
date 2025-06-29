import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards, Get, Put, Param
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TransactionFacade } from './transaction.facade';
import { CreateTransactionZodSchema, CreateTransactionDto } from 'src/applications/transaction/dto/create-transaction.dto';
import { ApiKeyGuard } from 'src/shared/guards/api-key.guard';
import { TokenGuard, EnsureValid } from 'src/shared/decorators/common.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ApiKeyUser } from 'src/shared/decorators/api-key-user.decorator';
import { ErpAuthenticatedUser } from 'src/types/erp-authenticated-user.type';
import { UserPayloadDto } from 'src/applications/user/dto/user-payload.dto';
import { ApproveTransactionDto, ApproveTransactionZodSchema } from 'src/applications/transaction/dto/approve-transaction.dto';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionController {
    constructor(private readonly transactionFacade: TransactionFacade) { }

    // ✅ Untuk user staff/admin
    @Post()
    @ApiOperation({ summary: 'Create transaction (by user)' })
    @TokenGuard(['user', 'admin'])
    @EnsureValid(CreateTransactionZodSchema, 'body')
    async createByUser(
        @CurrentUser() user: UserPayloadDto,
        @Body() dto: CreateTransactionDto,
    ) {
        return this.transactionFacade.create(dto, user.id);
    }

    // ✅ Untuk sistem ERP
    @UseGuards(ApiKeyGuard)
    @Post('from-erp')
    @ApiOperation({ summary: 'Create transaction (from ERP system)' })
    @EnsureValid(CreateTransactionZodSchema, 'body')
    async createFromERP(
        @Body() dto: CreateTransactionDto,
        @ApiKeyUser() user: ErpAuthenticatedUser,
    ) {
        return this.transactionFacade.create(dto, user.id); // id user ERP dari DB
    }


    @Get()
    @TokenGuard(['auditor', 'admin'])
    @ApiOperation({ summary: 'Get all transactions' })
    async findAll() {
        return this.transactionFacade.findAll();
    }


    @Put(':id/approval')
    @TokenGuard(['auditor', 'admin'])
    @EnsureValid(ApproveTransactionZodSchema, 'body')
    @ApiOperation({ summary: 'Approve or reject transaction' })
    async approveReject(
        @Param('id') id: string,
        @CurrentUser() user: UserPayloadDto,
        @Body() dto: ApproveTransactionDto,
    ) {
        return this.transactionFacade.approveReject(id, dto.decision, user.id);
    }

}
