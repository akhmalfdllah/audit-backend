import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { UserORM } from "./user.orm-entity";
import { TableName } from "src/configs/database.config";
import { GroupType } from "src/core/group/entities/group.entity";

@Entity({ name: TableName.Group })
export class GroupORM {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, unique: true })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column()
    type: GroupType;

    @OneToMany(() => UserORM, (user) => user.group)
    members: UserORM[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
