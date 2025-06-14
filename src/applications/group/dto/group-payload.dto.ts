import { IntersectionType } from "@nestjs/swagger";
import { Group } from "src/core/group/entities/group.entity";

export class GroupPayloadDto extends IntersectionType(Group) {}
export * from "src/core/group/entities/group.entity";
