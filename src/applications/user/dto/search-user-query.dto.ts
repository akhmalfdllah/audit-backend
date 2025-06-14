// search-user-query.dto.ts
import z from "zod";
import { ApiProperty } from "@nestjs/swagger";
import { Group } from "src/core/group/entities/group.entity";
import { Find } from "src/shared/utils/common.util";
import { UserRole } from "src/core/user/entities/user.entity";

// Zod schema for validation
export const searchUserQuerySchema = z.object({
  role: z.nativeEnum(UserRole, { message: "invalid role" }).optional(),
  group: z.string().optional().transform(Find.transformId),
});

// Raw query DTO
export class SearchUserQueryDto {
  @ApiProperty({ required: false, enum: UserRole })
  role?: UserRole;

  @ApiProperty({ required: false })
  group?: string;
}

// Transformed query DTO (after zod or manual transform)
export class SearchUserQueryTransformed {
  role?: UserRole;
  group?: Group;
}
