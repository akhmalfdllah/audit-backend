import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from 'src/interfaces/http/user/user.controller';
import { UserFacadeService } from 'src/interfaces/http/user/user.facade.service';

describe('UserController', () => {
    let controller: UserController;
    let facade: UserFacadeService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                { provide: UserFacadeService, useValue: {} },
                { provide: UserController, useValue: {} },
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        facade = module.get<UserFacadeService>(UserFacadeService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});