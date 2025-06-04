import z from "zod";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Group } from "src/modules/group/entities/group.entity";
import { Find } from "src/shared/utils/common.util";
import { UserRole } from "src/configs/database.config";

export const searchUserQuerySchema = z.object({
  role: z.nativeEnum(UserRole, { message: "invalid role" }).optional(),
  group: z.string().optional().transform(Find.transformId),
});

type SearchUserQuerySchema = z.infer<typeof searchUserQuerySchema>; 
export class SearchUserQueryDto implements Omit<SearchUserQuerySchema, "node" | "group"> {
  @ApiProperty({ required: false, enum: UserRole })
  role: UserRole;

  @ApiProperty({ required: false })
  group: string;
}

export class SearchUserQueryTransformed extends OmitType(SearchUserQueryDto, ["group"]) {
  group: Group;
}
