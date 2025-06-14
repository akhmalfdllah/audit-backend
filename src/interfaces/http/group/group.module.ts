import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupORM } from "src/infrastructure/database/typeorm/entities/group.orm-entity";
import { GroupRepository } from "src/core/group/repositories/group.repository";
import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { GroupRepositoryImpl } from "src/infrastructure/database/repositories/group.repository.impl";

@Module({
  imports: [TypeOrmModule.forFeature([GroupORM])],
  providers: [
    {
      provide: GroupRepository,
      useClass: GroupRepositoryImpl,
    },
    GroupService,
  ],
  controllers: [GroupController],
  exports: [GroupRepository],
})
export class GroupModule {}
