import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn,
    UpdateDateColumn } from "typeorm"
import { Exclude } from "class-transformer";
import { TableName, UserRole } from "src/configs/database.config";
import { Group } from "src/core/group/entities/group.entity";
@Entity({ name: TableName.User })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: UserRole.Admin })
    role: UserRole;

    @Column({ default: null, nullable: true })
    @Exclude()
    refreshToken: string | null;

    @ManyToOne(() => Group, (group) => group.members)
    group: Group;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export { UserRole };
