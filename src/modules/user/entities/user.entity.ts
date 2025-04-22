import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { TableName } from "src/configs/database.config";
@Entity({ name: TableName.User })
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column({ default: "admin" })
    role: string;
}
