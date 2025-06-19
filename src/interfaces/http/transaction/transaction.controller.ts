import { Controller, Post, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { CreateTransactionSchema } from 'src/applications/transaction/dto/create-transaction.dto';
import { UpdateTransactionStatusSchema } from 'src/applications/transaction/dto/update-transaction-status.dto';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import { TransactionFacade } from './transaction.facade';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from 'src/core/user/entities/user.entity';

@Controller('transactions')
export class TransactionController {
    constructor(private readonly facade: TransactionFacade) { }

    @Post()
    @Roles(UserRole.User)
    async create(
        @Body(new ZodValidationPipe(CreateTransactionSchema)) body,
        @Req() req: any,
    ) {
        return await this.facade.create({ ...body, submittedBy: req.user.id });
    }

    @Patch('/status')
    @Roles(UserRole.Auditor)
    async updateStatus(
        @Body(new ZodValidationPipe(UpdateTransactionStatusSchema)) body,
        @Req() req: any,
    ) {
        return await this.facade.updateStatus(body, req.user.id);
    }
}
