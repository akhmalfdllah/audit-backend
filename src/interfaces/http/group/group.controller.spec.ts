import { Test, TestingModule } from "@nestjs/testing";
import { GroupController } from "src/interfaces/http/group/group.controller";
import { GroupFacadeService } from "src/interfaces/http/group/group.facade.service";

describe("GroupController", () => {
  let controller: GroupController;
  let facade: GroupFacadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [
        { provide: GroupController, useValue: {} },
        { provide: GroupFacadeService, useValue: {} },
      ],
    }).compile();
    controller = module.get<GroupController>(GroupController);
    facade = module.get<GroupFacadeService>(GroupFacadeService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});