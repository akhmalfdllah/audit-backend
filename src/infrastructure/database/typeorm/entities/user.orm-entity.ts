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

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Active })
    status: UserStatus;

    // @Column({ name: 'refresh_token', nullable: true })
    // refreshToken?: string;

    @ManyToOne(() => GroupORM, (group) => group.members, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({ name: "groupId" })
    group: GroupORM;

    @Column({ nullable: true })
    groupId: string;

    @Column({ nullable: true })
    apiKey: string | null;

    @Column({ type: "text", nullable: true })
    hashedRefreshToken: string | null;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}