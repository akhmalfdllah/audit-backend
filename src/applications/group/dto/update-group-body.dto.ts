import { ApiPropertyOptional } from "@nestjs/swagger";
import { z } from "zod";
import { GroupType } from "src/core/group/entities/group.entity";

export const updateGroupBodySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  type: z.nativeEnum(GroupType).optional(),
});

export class UpdateGroupBodyDto implements z.infer<typeof updateGroupBodySchema> {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional({ enum: GroupType })
  type?: GroupType;
}
