import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupController } from "src/modules/group/group.controller";
import { GroupService } from "src/modules/group/group.service";
import { GroupRepository } from "src/modules/group/group.repository";
import { Group } from "src/modules/group/entities/group.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [GroupRepository, GroupService],
  exports: [GroupService],
})
export class GroupModule {}
