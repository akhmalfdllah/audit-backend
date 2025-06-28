import { Transaction } from 'src/core/transaction/entities/transaction.entity';
import { TransactionORM } from 'src/infrastructure/database/typeorm/entities/transaction.orm-entity';

export class TransactionMapper {

  static toDomain(orm: TransactionORM): Transaction {
    return new Transaction(
      orm.id,
      orm.title,
      +orm.amount,
      orm.category,
      orm.description,
      orm.status,
      orm.submittedBy,
      orm.approvedBy,
      orm.createdAt,
      orm.updatedAt,
    );
  }
  static toORM(trx: Transaction): TransactionORM {
    const orm = new TransactionORM();
    orm.id = trx.id;
    orm.title = trx.title;
    orm.amount = trx.amount;
    orm.category = trx.category;
    orm.description = trx.description;
    orm.status = trx.status;
    orm.submittedBy = trx.submittedBy;
    orm.approvedBy = trx.approvedBy;
    orm.createdAt = trx.createdAt;
    orm.updatedAt = trx.updatedAt;
    return orm;
  }
}