import { User } from "src/core/user/entities/user.entity";

export abstract class UserRepository {
    abstract findOneBy(where: Partial<User>): Promise<User | null>;
    abstract findOneByOrFail(where: Partial<User>): Promise<User>;
    abstract find(options: object): Promise<User[]>;
    abstract save(user: Partial<User>): Promise<User>;
    abstract remove(user: User): Promise<User>;
    abstract update(id: string, user: Partial<User>): Promise<User>;
}