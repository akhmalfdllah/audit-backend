// search-user-query.dto.ts
import z from "zod";
import { ApiProperty } from "@nestjs/swagger";
import { Group } from "src/core/group/entities/group.entity";
import { Find } from "src/shared/utils/common.util";
import { UserRole, UserStatus } from "src/core/user/entities/user.entity";

export const searchUserQuerySchema = z.object({
  fullname: z.string().optional(),
  role: z.nativeEnum(UserRole).optional(),
  status: z.nativeEnum(UserStatus).optional(),
  groupId: z.string().uuid("Invalid group ID").optional().transform(Find.transformId),
  page: z.string().optional().transform((val) => parseInt(val || '1', 10)),
  limit: z.string().optional().transform((val) => parseInt(val || '10', 10)),
  keyword: z.string().optional()
// }).refine((data) => {
//   const { role, status, groupId, keyword } = data
//   return role || status || groupId || keyword
// }, {
//   message: "Minimal satu filter harus diisi"
});

export class SearchUserQueryDto {
  @ApiProperty({ required: false })
  fullname?: string;

  @ApiProperty({ required: false, enum: UserRole })
  role?: UserRole;

  @ApiProperty({ required: false, enum: UserStatus })
  status?: UserStatus;

  @ApiProperty({ required: false })
  groupId?: string;

  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  limit?: number;

  @ApiProperty({ required: false })
  keyword?: string;
}

export class SearchUserQueryTransformed {
  fullname?: string;
  role?: UserRole;
  status?: UserStatus;
  group?: Group;
  page?: number;
  limit?: number;
  keyword?: string;
}
