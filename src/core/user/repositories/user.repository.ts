import { User } from "src/core/user/entities/user.entity";
import { SearchUserQueryTransformed } from "src/applications/user/dto/search-user-query.dto";
export abstract class UserRepository {
     abstract findOneBy(where: Partial<User>): Promise<User | null>;
     abstract findOneByOrFail(where: Partial<User>): Promise<User>;
     abstract findAllByGroupId(groupId: string): Promise<User[]>;
     abstract find(filter?: any): Promise<User[]>
     abstract findByApiKey(apiKey: string): Promise<User | null>;
     abstract save(user: Partial<User>): Promise<User>;
     abstract remove(user: User): Promise<User>;
     abstract update(id: string, user: Partial<User>): Promise<User>;
     abstract search(filter: SearchUserQueryTransformed): Promise<User[]>;
}