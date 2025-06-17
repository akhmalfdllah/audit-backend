import { Injectable } from "@nestjs/common";
import { UserFacadeService } from "src/interfaces/http/user/user.facade.service";
import { SignUpBodyDto } from "src/applications/auth/dto/signup-body.dto";

@Injectable()
export class SignUpUseCase {
    constructor(private readonly userFacadeService: UserFacadeService) { }

    async execute(signUpBodyDto: SignUpBodyDto) {
        return await this.userFacadeService.create(signUpBodyDto);
    }
}
