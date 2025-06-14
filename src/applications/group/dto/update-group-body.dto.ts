import z from "zod";
import { ApiProperty } from "@nestjs/swagger";

export const updateGroupBodySchema = z.object({
  name: z.string().trim().min(1, { message: "name can't be empty" }).toLowerCase(),
  description: z.string().trim().min(1, { message: "description can't be empty" }),
});

type UpdateGroupBodySchema = z.infer<typeof updateGroupBodySchema>;
export class UpdateGroupBodyDto implements UpdateGroupBodySchema {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  description: string;
}
