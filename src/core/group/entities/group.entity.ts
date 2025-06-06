import { TableName } from "src/configs/database.config";
import { User } from "src/core/user/entities/user.entity";
import { Column, CreateDateColumn, UpdateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, JoinTable, ManyToMany } from "typeorm";

@Entity({name: TableName.Group})
export class Group {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({nullable: false, unique: true})
    name: string;

    @Column({nullable: false})

    @OneToMany(() => User, (user) => user.group)
    members: User[];

    // @ManyToMany(() => Node, (node) => node.groups)
    // @JoinTable()
    // apps: Node[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}