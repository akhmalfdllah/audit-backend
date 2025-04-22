import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { TableName } from "src/configs/database.config";
@Entity({name: TableName.Transaction})
export class Transaction {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @Column()
    amount: number;

    @Column()
    type: string;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    createdAt:Date;
}