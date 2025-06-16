// src/applications/user/dto/user-payload.dto.ts

import { Expose, Transform } from "class-transformer";
import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { Action, Link } from "src/shared/extra-dto/base/common.dto";
import { UserRole } from "src/core/user/entities/user.entity";
import { Group } from "src/core/group/entities/group.entity";

// Base DTO
export class UserBaseDto {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  username: string;

  @ApiProperty({ enum: UserRole })
  @Expose()
  role: UserRole;

  @ApiProperty({ type: () => Date })
  @Expose()
  createdAt: Date;

  @ApiProperty({ type: () => Date })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ type: () => [String] })
  @Expose()
  groups: Group[]; // or group names/ids depending on need
}

// Enrich with action & link
export class UserPayloadDto extends UserBaseDto {
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

// Extracted for clarity/testability
export function transformLinks(user: { id: string }): Record<string, Link> {
  const self = new Link(`/user/${user.id}`);
  const group = new Link(`/group?member=${user.id}`);
  return { self, group };
}
