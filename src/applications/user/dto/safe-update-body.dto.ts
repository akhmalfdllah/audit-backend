import z from "zod";
import { ApiProperty } from "@nestjs/swagger";

export const safeUpdateBodySchema = z.object({
  actorId: z.string().uuid("Invalid actor ID"),
  username: z.string().trim().min(1, "username can't be empty"),
  password: z.string().trim().min(1, "password can't be empty"),
  confirmPassword: z.string().trim().min(1, "confirm password can't be empty"),
});

type SafeUpdateBodySchema = z.infer<typeof safeUpdateBodySchema>;
export class SafeUpdateBodyDto implements SafeUpdateBodySchema {
  @ApiProperty()
  actorId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmPassword: string;
}
