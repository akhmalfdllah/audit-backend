import { Test, TestingModule } from "@nestjs/testing";
import { UserFacadeService } from "src/interfaces/http/user/user.facade.service";

import {
    CreateUserUseCase,
    FindAllUsersUseCase,
    FindOneUserUseCase,
    UpdateUserUseCase,
    SafeUpdateUserUseCase,
    DeleteUserUseCase,
    VerifyUserUseCase,
    VerifyUserWithRefreshTokenUseCase,
    SignOutUseCase,
    UpdateRefreshTokenUseCase,
    RetrieveGroupUseCase,
} from "src/applications/user/use-cases/common.use-case";

describe("UserFacadeService", () => {
    let facade: UserFacadeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserFacadeService,
                { provide: CreateUserUseCase, useValue: {  } },
                { provide: FindAllUsersUseCase, useValue: {  } },
                { provide: FindOneUserUseCase, useValue: {  } },
                { provide: UpdateUserUseCase, useValue: {  } },
                { provide: SafeUpdateUserUseCase, useValue: {  } },
                { provide: DeleteUserUseCase, useValue: {  } },
                { provide: VerifyUserUseCase, useValue: {  } },
                { provide: VerifyUserWithRefreshTokenUseCase, useValue: {  } },
                { provide: SignOutUseCase, useValue: {  } },
                { provide: UpdateRefreshTokenUseCase, useValue: {  } },
                { provide: RetrieveGroupUseCase, useValue: {  } },
            ],
        }).compile();

        facade = module.get<UserFacadeService>(UserFacadeService);
    });

    it("should be defined", () => {
        expect(facade).toBeDefined();
    });
});