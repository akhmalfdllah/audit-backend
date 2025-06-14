import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
} from "typeorm";
import { UserORM } from "./user.orm-entity";
import { TableName } from "src/configs/database.config";

@Entity({ name: TableName.Group })
export class GroupORM {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false })
    description: string;

    @ManyToMany(() => UserORM, (user) => user.groups)
    members: UserORM[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
