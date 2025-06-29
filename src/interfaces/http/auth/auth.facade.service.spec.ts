import { Test, TestingModule } from "@nestjs/testing";
import { AuthFacadeService } from "src/interfaces/http/auth/auth.facade.service";
import {
    SignInUseCase,
    RefreshTokenUseCase,
    SignOutUseCase,
} from "src/applications/auth/use-cases/common.use-case"

describe("AuthFacadeService", () => {
    let service: AuthFacadeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthFacadeService,
                { provide: SignInUseCase, useValue: { execute: jest.fn() },},
                { provide: SignOutUseCase, useValue: { execute: jest.fn() },},
                { provide: SignOutUseCase, useValue: { execute: jest.fn() },},
                { provide: RefreshTokenUseCase, useValue: { execute: jest.fn() },},
            ],
        }).compile();

        service = module.get<AuthFacadeService>(AuthFacadeService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
