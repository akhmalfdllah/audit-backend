import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionORM } from 'src/infrastructure/database/typeorm/entities/transaction.orm-entity';
import { TransactionController } from 'src/interfaces/http/transaction/transaction.controller';
import { TransactionFacade } from 'src/interfaces/http/transaction/transaction.facade';
import { CreateTransactionUseCase } from 'src/applications/transaction/use-cases/create-transaction.use-case';
import { UpdateTransactionStatusUseCase } from 'src/applications/transaction/use-cases/update-transaction-status.use-case';
import { TransactionRepository } from 'src/core/transaction/repositories/transaction.repository';
import { TransactionRepositoryImpl } from 'src/infrastructure/database/repositories/transaction.repository.impl';
import { AuditLogModule } from '../audit-log/audit-log.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionORM]), AuditLogModule],
  controllers: [TransactionController],
  providers: [
    TransactionFacade,
    CreateTransactionUseCase,
    UpdateTransactionStatusUseCase,
    { provide: TransactionRepository, useClass: TransactionRepositoryImpl },
  ],
})
export class TransactionModule {}
