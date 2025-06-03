import { TableName } from "src/configs/database.config";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";

@Entity({name: TableName.Group})
export class Group {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false, unique: true})
    name: string;

    @Column({nullable: false})

    @OneToMany(() => User, (user) => user.group)
    members: User

    @CreateDateColumn()
    createdAt: Date;
}