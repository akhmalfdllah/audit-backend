import {
    Body,
    Controller,
    Post,
    UseGuards, Get, Put, Param, UseInterceptors
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionFacade } from './transaction.facade';
import { CreateTransactionZodSchema, CreateTransactionDto } from 'src/applications/transaction/dto/create-transaction.dto';
import { ApiKeyGuard } from 'src/shared/guards/api-key.guard';
import { TokenGuard, EnsureValid } from 'src/shared/decorators/common.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { ApiKeyUser } from 'src/shared/decorators/api-key-user.decorator';
import { ErpAuthenticatedUser } from 'src/types/erp-authenticated-user.type';
import { UserPayloadDto } from 'src/applications/user/dto/user-payload.dto';
import { ApproveTransactionDto, ApproveTransactionZodSchema } from 'src/applications/transaction/dto/approve-transaction.dto';
import { AuditLogInterceptor } from 'src/shared/interceptors/audit-log.interceptor';
import { AuditAction } from 'src/core/audit-log/entities/audit-log.entity';
import { AuditActionDecorator } from 'src/shared/decorators/audit-action.decorator';

@Controller('transactions')
@ApiBearerAuth()
@UseInterceptors(AuditLogInterceptor)
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
    @Get('all')
    @TokenGuard(['auditor', 'admin'])
    @ApiOperation({ summary: 'Get all transactions' })
    async findAll() {
        console.log('[TransactionController] findAll dijalankan (tanpa @CurrentUser)');
        return this.transactionFacade.findAll();
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
