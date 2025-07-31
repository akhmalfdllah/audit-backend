// user-payload.dto.ts
import { Expose, Transform } from "class-transformer";
import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { UserRole, UserStatus } from "src/core/user/entities/user.entity";
import { Action, Link } from "src/shared/extra-dto/base/common.dto";


export class GroupSummaryDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;
}
// DTO utama untuk User
export class UserPayloadDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty({ enum: UserRole })
  @Expose()
  role: UserRole;

  @ApiProperty({ example: UserStatus.Active })
  @Expose()
  status: UserStatus;

  @ApiProperty({ type: () => GroupSummaryDto, nullable: true })
  @Expose()
  group: GroupSummaryDto | null;

  @ApiProperty({ type: () => Date })
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: () => Date })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ type: [Action] })
  @Expose()
  _action: Action[];

  @ApiProperty({
    type: 'object',
    additionalProperties: { $ref: getSchemaPath(Link) },
  })
  @Expose()
  @Transform(({ obj }) => transformLinks(obj))
  _link: Record<string, Link>;
}

// Link generator
export function transformLinks(user: { id: string }): Record<string, Link> {
  const self = new Link(`/users/${user.id}`);
  const audit = new Link(`/audit-logs?actor=${user.id}`);
  const tx = new Link(`/transactions?submittedBy=${user.id}`);
  return { self, audit, transactions: tx };
}
