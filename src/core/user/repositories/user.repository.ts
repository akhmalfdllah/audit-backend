import { User } from "src/core/user/entities/user.entity";
import { SearchUserQueryTransformed } from "src/applications/user/dto/search-user-query.dto";
export interface UserRepository {
     findOneBy(where: Partial<User>): Promise<User | null>;
     findOneByOrFail(where: Partial<User>): Promise<User>;
     find(filter?: any): Promise<User[]>
     save(user: Partial<User>): Promise<User>;
     remove(user: User): Promise<User>;
     update(id: string, user: Partial<User>): Promise<User>;
     search(filter: SearchUserQueryTransformed): Promise<User[]>;
}