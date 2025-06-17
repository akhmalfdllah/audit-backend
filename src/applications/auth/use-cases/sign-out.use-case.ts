import { Injectable } from "@nestjs/common";
import { UserFacadeService } from "src/interfaces/http/user/user.facade.service";

@Injectable()
export class SignOutUseCase {
    constructor(private readonly userFacedeService: UserFacadeService) { }

    async execute(userId: string, refreshToken: string) {
        await this.userFacedeService.signOut(userId, refreshToken);
        return { message: "signout successfull!" };
    }
}
