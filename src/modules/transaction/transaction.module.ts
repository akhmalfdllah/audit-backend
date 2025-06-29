import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionORM } from 'src/infrastructure/database/typeorm/entities/transaction.orm-entity';
import { TransactionController } from 'src/interfaces/http/transaction/transaction.controller';
import { TransactionFacade } from 'src/interfaces/http/transaction/transaction.facade';
import { CreateTransactionUseCase } from 'src/applications/transaction/use-cases/create-transaction.use-case';
import { TransactionRepository } from 'src/core/transaction/repositories/transaction.repository';
import { TransactionRepositoryImpl } from 'src/infrastructure/database/repositories/transaction.repository.impl';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { GetAllTransactionsUseCase } from 'src/applications/transaction/use-cases/get-all-transactions.use-case';
import { ApproveRejectTransactionUseCase } from 'src/applications/transaction/use-cases/approve-reject-transaction.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionORM]), AuditLogModule],
  controllers: [TransactionController],
  providers: [
    TransactionFacade,
    CreateTransactionUseCase,
    GetAllTransactionsUseCase,
    ApproveRejectTransactionUseCase,
    { 
      provide: TransactionRepository, 
      useClass: TransactionRepositoryImpl 
    },
  ],
  exports: [TransactionFacade],
})
export class TransactionModule {}

