// verify-user.dto.ts
import z from "zod";
import { ApiProperty } from "@nestjs/swagger";

// Schema untuk validasi awal (controller level)
export const verifyUserBodySchema = z.object({
  username: z.string().trim().min(1, "Username can't be empty").toLowerCase(),
  password: z.string().trim().min(1, "Password can't be empty"),
});

export type VerifyUserBodySchema = z.infer<typeof verifyUserBodySchema>;

export class VerifyUserBodyDto implements VerifyUserBodySchema {
  @ApiProperty({ example: "admin" })
  username: string;

  @ApiProperty({ example: "admin" })
  password: string;
}
