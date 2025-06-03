import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Exclude } from "class-transformer";
import { TableName, UserRole } from "src/configs/database.config";
import { Group } from "src/modules/group/entities/group.entity";
@Entity({ name: TableName.User })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ default: UserRole.Admin })
    role: UserRole;

    @ManyToOne(() => Group, (group) => group.members)
    group: Group;
}

export { UserRole };
