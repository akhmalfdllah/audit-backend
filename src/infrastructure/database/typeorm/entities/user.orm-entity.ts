import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToMany } from "typeorm";
import { UserRole } from "src/core/user/entities/user.entity";
import { GroupORM } from "src/infrastructure/database/typeorm/entities/group.orm-entity";
import { TableName } from "src/configs/database.config";

@Entity({ name: TableName.User })
export class UserORM {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ default: UserRole.User })
    role: UserRole;

    @Column({ nullable: true })
    refreshToken: string | null;

    @ManyToMany(() => GroupORM, (group) => group.members)
    @JoinTable()
    groups: GroupORM[];


    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;
}