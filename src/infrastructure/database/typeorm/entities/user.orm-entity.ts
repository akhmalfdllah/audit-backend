import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "src/core/user/entities/user.entity";
import { GroupORM } from "src/infrastructure/database/typeorm/entities/group.orm-entity";

@Entity('users')
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

    @ManyToOne(() => GroupORM, (group) => group.members)
    group: GroupORM;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}