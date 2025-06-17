import { Test, TestingModule } from "@nestjs/testing";
import { GroupFacadeService } from "src/interfaces/http/group/group.facade.service";
import {
  CreateGroupUseCase,
  DeleteGroupUseCase,
  FindAllGroupUseCase,
  FindOneGroupUseCase,
  UpdateGroupUseCase
} from "src/applications/group/use-cases/common.use-case";

describe("GroupFacadeSevice", () => {
  let groupFacade: GroupFacadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupFacadeService,
        { provide: CreateGroupUseCase, useValue:{ execute: jest.fn() }, },
        { provide: DeleteGroupUseCase, useValue:{ execute: jest.fn() }, },
        { provide: FindAllGroupUseCase, useValue:{ execute: jest.fn() }, },
        { provide: FindOneGroupUseCase, useValue:{ execute: jest.fn() }, },
        { provide: UpdateGroupUseCase, useValue:{ execute: jest.fn() }, },
        
      ],
    }).compile();

    groupFacade = module.get<GroupFacadeService>(GroupFacadeService);
  });

  it("should be defined", () => {
    expect(groupFacade).toBeDefined();
  });
});