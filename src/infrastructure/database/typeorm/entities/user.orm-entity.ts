import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { GroupORM } from "src/infrastructure/database/typeorm/entities/group.orm-entity";
import { UserRole, UserStatus } from "src/core/user/entities/user.entity";
import { TableName } from "src/configs/database.config";

@Entity({ name: TableName.User })
export class UserORM {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    role: UserRole;

    @Column({ nullable: true })
    email: string | null;

    @Column({ nullable: true })
    fullName: string | null;

    @Column({ nullable: true })
    status: UserStatus;

    @Column({ nullable: true })
    refreshToken: string | null;

    @ManyToOne(() => GroupORM, (group) => group.members, { nullable: true })
    @JoinColumn({ name: "groupId" })
    group: GroupORM;

    @Column({ nullable: true })
    groupId: string;

    @Column({ nullable: true }) // ✅ Tambahkan ini
    apiKey: string;

    @Column({ type: 'text', nullable: true })
    hashedRefreshToken?: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}