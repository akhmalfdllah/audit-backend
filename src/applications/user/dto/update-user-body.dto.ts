import z from "zod";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole, UserStatus } from "src/core/user/entities/user.entity";

export const updateUserBodySchema = z
  .object({
    fullName: z.string().trim().min(1).optional(),
    username: z.string().trim().min(1).toLowerCase().optional(),
    role: z.nativeEnum(UserRole).optional(),
    status: z.nativeEnum(UserStatus).optional(),
    email: z.string().email().optional(),
    groupId: z.string().uuid().optional(),
    password: z.string().trim().min(1).optional(),
    confirmPassword: z.string().trim().min(1).optional(),
  })
  .refine((data) => {
    if (data.password || data.confirmPassword) {
      return data.password === data.confirmPassword
    }
    return true // ✅ tidak ada password = tidak perlu validasi
  }, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;

export class UpdateUserBodyDto implements Omit<UpdateUserBodySchema, "groupId"> {

  @ApiProperty({ required: false, example: undefined })
  username?: string;

  @ApiProperty({ required: false, example: undefined })
  password?: string;

  @ApiProperty({ required: false, example: undefined })
  confirmPassword?: string;

  @ApiProperty({ enum: UserRole, required: false, example: undefined })
  role?: UserRole;

  @ApiProperty({ enum: UserStatus, required: false, example: undefined })
  status?: UserStatus;

  @ApiProperty({ required: false, example: undefined })
  fullName?: string;

  @ApiProperty({ required: false, example: undefined })
  email?: string;

  @ApiProperty({ required: false, example: undefined })
  groupId?: string | null;
}

export class UpdateUserBodyTransformed {
  actorId: string;
  role?: UserRole;
  status?: UserStatus;
  fullName?: string;
  email?: string;
  groupId?: string | { id: string } | null;
  password?: string;
  confirmPassword?: string;
}
