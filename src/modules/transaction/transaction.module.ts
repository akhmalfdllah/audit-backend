import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { TransactionORM } from 'src/infrastructure/database/typeorm/entities/transaction.orm-entity';
import { TransactionController } from 'src/interfaces/http/transaction/transaction.controller';
import { TransactionFacade } from 'src/interfaces/http/transaction/transaction.facade';
import { CreateTransactionUseCase } from 'src/applications/transaction/use-cases/create-transaction.use-case';
import { TransactionRepository } from 'src/core/transaction/repositories/transaction.repository';
import { TransactionRepositoryImpl } from 'src/infrastructure/database/repositories/transaction.repository.impl';
import { AuditLogModule } from '../audit-log/audit-log.module';
import { GetAllTransactionsUseCase } from 'src/applications/transaction/use-cases/get-all-transactions.use-case';
import { ApproveRejectTransactionUseCase } from 'src/applications/transaction/use-cases/approve-reject-transaction.use-case';
import { ApiKeyGuard } from 'src/shared/guards/api-key.guard';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([TransactionORM]), AuditLogModule, PassportModule],
  controllers: [TransactionController],
  providers: [
    { 
      provide: TransactionRepository, 
      useClass: TransactionRepositoryImpl 
    },
    ApiKeyGuard,
    TransactionFacade,
    CreateTransactionUseCase,
    GetAllTransactionsUseCase,
    ApproveRejectTransactionUseCase,
  ],
  exports: [TransactionFacade],
})
export class TransactionModule {}

