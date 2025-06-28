import { ApiProperty } from "@nestjs/swagger";
import { z } from "zod";
import { GroupType } from "src/core/group/entities/group.entity";

export const createGroupBodySchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().min(1, "Description is required"),
  type: z.nativeEnum(GroupType, { message: "Invalid group type" }),
});

export class CreateGroupBodyDto implements z.infer<typeof createGroupBodySchema> {
  @ApiProperty({ example: "Finance Jakarta" })
  name: string;

  @ApiProperty({ example: "Divisi keuangan wilayah Jakarta" })
  description: string;

  @ApiProperty({ enum: GroupType, example: GroupType.INTERNAL })
  type: GroupType;
}
