import type { ZodSchema } from "zod";
import { applyDecorators, Paramtype, UsePipes } from "@nestjs/common";
import { ZodValidationPipe } from "src/shared/pipes/zod-validation.pipe";

export function EnsureValid(schema: ZodSchema, paramType?: Paramtype) {
  return applyDecorators(UsePipes(new ZodValidationPipe(schema, paramType)));
}
