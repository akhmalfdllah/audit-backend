import { User } from "src/core/user/entities/user.entity";

export abstract class IUserRepository {
    abstract findById(id: string): Promise<User | null>;
    abstract findByUsername(username: string): Promise<User | null>;
    abstract create(user: User): Promise<User>;
    abstract update(user: User): Promise<User>;
    abstract delete(id: string): Promise<void>;
}