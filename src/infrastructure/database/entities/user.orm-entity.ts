import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
    CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { GroupORM } from './group.orm-entity';
import { UserRole } from 'src/core/user/entities/user.entity';

@Entity({ name: 'users' })
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
    refreshToken: string;

    @ManyToOne(() => GroupORM, (group) => group.members)
    group: GroupORM;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
