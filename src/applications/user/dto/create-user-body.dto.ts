// src/core/user/dtos/create-user.dto.ts
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
    groupIds: z.array(z.string().uuid("Invalid group ID")).min(1, "At least one group must be assigned"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

export class CreateUserBodyDto implements CreateUserBodySchema {

  @ApiProperty()
  actorId: string;

  @ApiProperty({ example: "admin" })
  username: string;

  @ApiProperty({ example: "Admin Budi" })
  fullName: string;

  @ApiProperty({ example: "admin@email.com" })
  email: string;

  @ApiProperty({ example: "admin123" })
  password: string;

  @ApiProperty({ example: "admin123" })
  confirmPassword: string;

  @ApiProperty({ example: UserRole.User })
  role: UserRole;

  @ApiProperty({ example: UserStatus.Active })
  status: UserStatus;

  @ApiProperty({ example: ["uuid-group-1", "uuid-group-2"] })
  groupIds: string[];
}
