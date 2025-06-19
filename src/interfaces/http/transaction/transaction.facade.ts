import { Injectable } from '@nestjs/common';
import { CreateTransactionUseCase } from 'src/applications/transaction/use-cases/create-transaction.use-case';
import { UpdateTransactionStatusUseCase } from 'src/applications/transaction/use-cases/update-transaction-status.use-case';
import { CreateTransactionDto } from 'src/applications/transaction/dto/create-transaction.dto';
import { UpdateTransactionStatusDto } from 'src/applications/transaction/dto/update-transaction-status.dto';

@Injectable()
export class TransactionFacade {
    constructor(
        private readonly createUseCase: CreateTransactionUseCase,
        private readonly updateStatusUseCase: UpdateTransactionStatusUseCase,
    ) { }

    async create(dto: CreateTransactionDto) {
        return await this.createUseCase.execute(dto);
    }

    async updateStatus(dto: UpdateTransactionStatusDto, actorId: string) {
        return await this.updateStatusUseCase.execute(dto, actorId);
    }
}
