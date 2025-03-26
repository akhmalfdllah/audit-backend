import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { TableName } from "src/config/database.config";
@Entity({ name: TableName.User })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: 'user' })
    role: string;
}
