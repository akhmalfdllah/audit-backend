import z from "zod";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { User } from "src/modules/user/entities/user.entity";
import { Node } from "src/modules/node/entities/node.entity";
import { Find } from "src/shared/utils/common.util";

export const searchGroupQuerySchema = z.object({
  member: z.string().optional().transform(Find.transformId),
  app: z.string().optional().transform(Find.transformId),
});

type SearchGroupQuerySchema = z.infer<typeof searchGroupQuerySchema>;
export class SearchGroupQueryDto implements Omit<SearchGroupQuerySchema, "member" | "app"> {
  @ApiProperty({ required: false })
  member: string;
  @ApiProperty({ required: false })
  app: string;
}

export class SearchGroupQueryTransformed extends OmitType(SearchGroupQueryDto, ["app", "member"]) {
  member: User;
  app: Node;
}
