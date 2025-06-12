import { IntersectionType } from "@nestjs/swagger";
import { Group } from "src/modules/group/entities/group.entity";

export class GroupPayloadDto extends IntersectionType(Group) {}
export * from "src/modules/group/entities/group.entity";
