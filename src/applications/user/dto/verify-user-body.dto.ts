// src/applications/user/dto/verify-user-body.dto.ts
import z from "zod";
import { ApiProperty } from "@nestjs/swagger";

export const verifyUserBodySchema = z.object({
  username: z.string().trim().min(1, "username can't be empty"),
  password: z.string().trim().min(1, "password can't be empty"),
});

type VerifyUserBodySchema = z.infer<typeof verifyUserBodySchema>;

export class VerifyUserBodyDto implements VerifyUserBodySchema {
  @ApiProperty({ default: "admin" })
  username: string;

  @ApiProperty({ default: "admin" })
  password: string;
}
