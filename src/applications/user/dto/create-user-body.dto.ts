import z from "zod";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole, UserStatus } from "src/core/user/entities/user.entity";

export const createUserBodySchema = z
  .object({
    username: z.string().trim().min(1, "Username can't be empty").toLowerCase(),
    fullName: z.string().trim().min(1, "Full name can't be empty"),
    email: z.string().email("Invalid email format"),
    password: z.string().trim().min(1, "Password can't be empty"),
    confirmPassword: z.string().trim().min(1, "Confirm password can't be empty"),
    role: z.nativeEnum(UserRole, { message: "Invalid role!" }).default(UserRole.User),
    status: z.nativeEnum(UserStatus).default(UserStatus.Active),
    groupId: z.string().uuid("Invalid group ID"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

export class CreateUserBodyDto implements CreateUserBodySchema {

  @ApiProperty({ example: "admin" })
  username: string;

  @ApiProperty({ example: "Admin Budi" })
  fullName: string;

  @ApiProperty({ example: "admin@gmail.com" })
  email: string;

  @ApiProperty({ example: "admin123" })
  password: string;

  @ApiProperty({ example: "admin123" })
  confirmPassword: string;

  @ApiProperty({ example: UserRole.Admin })
  role: UserRole;

  @ApiProperty({ example: UserStatus.Active })
  status: UserStatus;

  @ApiProperty()
  groupId: string;
}
export type CreateUserInput = CreateUserBodyDto & {
  actorId?: string; // dipakai di audit log
};
