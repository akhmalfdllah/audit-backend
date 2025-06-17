import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "src/interfaces/http/auth/auth.controller";
import { AuthFacadeService } from "src/interfaces/http/auth/auth.facade.service";
import { CookieService } from "src/shared/services/cookie.service";

describe("AuthController", () => {
    let controller: AuthController;
    let facade: AuthFacadeService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: AuthFacadeService, useValue: {}, },
                { provide: AuthController, useValue: {}, },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
        facade = module.get<AuthFacadeService>(AuthFacadeService);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
