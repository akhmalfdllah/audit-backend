import z from "zod";
import { ApiProperty } from "@nestjs/swagger";

export const updateSelfBodySchema = z.object({
  username: z.string().trim().min(1, "username can't be empty"),
  password: z.string().trim().min(1, "password can't be empty"),
  confirmPassword: z.string().trim().min(1, "confirm password can't be empty"),
}).refine((data) => {
  if (data.password || data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: 'Password dan Confirm Password harus sama',
  path: ['confirmPassword'],
});

type UpdateSelfBodySchema = z.infer<typeof updateSelfBodySchema>;
export class UpdateSelfBodyDto implements UpdateSelfBodySchema {

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  confirmPassword: string;
};