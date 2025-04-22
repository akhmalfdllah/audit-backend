import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class UserRepository extends Repository<User> {
    constructor (
        @InjectRepository(User)
        protected repository: Repository<User>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}
