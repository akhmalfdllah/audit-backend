import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { UserORM } from "./user.orm-entity";

@Entity('groups')
export class GroupORM {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable:false, unique: true })
    name: string;

    @OneToMany(() => UserORM, (user) => user.group)
    members: UserORM[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
