import z from "zod";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "src/configs/database.config";

export const createUserBodySchema = z.object({
  username: z.string().trim().min(1, "username can't be empty").toLowerCase(),
  role: z.nativeEnum(UserRole, { message: "invalid role!" }).optional(),
  password: z.string().trim().min(1, "password can't be empty"),
  confirmPassword: z.string().trim().min(1, "confirm password can't be empty"),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;
export class CreateUserBodyDto implements CreateUserBodySchema {
  @ApiProperty({ default: "root" })
  username: string;

  @ApiProperty({ default: UserRole.User, required: false })
  role: UserRole;

  @ApiProperty({ default: "root" })
  password: string;

  @ApiProperty({ default: "root" })
  confirmPassword: string;
}
