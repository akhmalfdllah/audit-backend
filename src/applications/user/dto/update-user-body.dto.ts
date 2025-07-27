import z from "zod";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Prop } from "src/shared/utils/common.util";
import { UserRole, UserStatus } from "src/core/user/entities/user.entity";

export const updateUserBodySchema = z.object({
  fullName: z.string().min(1).optional(),
  username: z.string().min(1).optional(),
  role: z.nativeEnum(UserRole, { message: "Invalid role" }).optional(),
  status: z.nativeEnum(UserStatus).optional(),
  email: z.string().email().optional(),
  groupId: z.string().uuid().nullable().optional().transform(Prop.transFormNullableId),
  password: z.string().min(1).optional(),
  confirmPassword: z.string().min(1).optional(),
});

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;

export class UpdateUserBodyDto implements Omit<UpdateUserBodySchema, "groupId"> {

  @ApiProperty({ required: false })
  username?: string;

  @ApiProperty({ required: false })
  password?: string;

  @ApiProperty({ required: false })
  confirmPassword?: string;

  @ApiProperty({ enum: UserRole, required: false })
  role?: UserRole;

  @ApiProperty({ enum: UserStatus, required: false })
  status?: UserStatus;

  @ApiProperty({ required: false })
  fullName?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ required: false })
  groupId?: string;
}

export class UpdateUserBodyTransformed {
  actorId: string;
  role?: UserRole;
  status?: UserStatus;
  fullName?: string;
  email?: string;
  groupId: string;
  password?: string;
  confirmPassword?: string;
}
