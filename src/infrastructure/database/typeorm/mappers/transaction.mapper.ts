import { Transaction } from 'src/core/transaction/entities/transaction.entity';
import { TransactionORM } from 'src/infrastructure/database/typeorm/entities/transaction.orm-entity';

export class TransactionMapper {
    static toDomain(orm: TransactionORM): Transaction {
    return new Transaction(
      orm.id,
      orm.title,
      orm.amount,  
      orm.submittedBy,
      orm.status,
      orm.createdAt,
      orm.updatedAt,
    );
  }

  static toORM(domain: Transaction): TransactionORM {
    const orm = new TransactionORM();
    //orm.id = domain.id;
    orm.title = domain.title;
    orm.amount = domain.amount;
    orm.submittedBy = domain.submittedBy;
    orm.status = domain.status;
    orm.createdAt = domain.createdAt;
    orm.updatedAt = domain.updatedAt;
    return orm;
  }
}