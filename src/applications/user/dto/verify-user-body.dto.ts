// verify-user.dto.ts
import z from "zod";
import { ApiProperty } from "@nestjs/swagger";

// Schema untuk validasi awal (controller level)
export const verifyUserBodySchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().trim().min(1, "Password can't be empty"),
});

export type VerifyUserBodySchema = z.infer<typeof verifyUserBodySchema>;

export class VerifyUserBodyDto implements VerifyUserBodySchema {
  @ApiProperty({ example: "admin@gmail.com" })
  email: string;

  @ApiProperty({ example: "admin123" })
  password: string;
}
