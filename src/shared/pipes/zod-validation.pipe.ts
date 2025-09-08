import { PipeTransform, ArgumentMetadata, BadRequestException, Paramtype } from "@nestjs/common";
import { type ZodSchema, ZodError } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(
    private schema: ZodSchema,
    private paramType?: Paramtype,
  ) { }

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      if (this.paramType) {
        if (metadata.type === this.paramType) {
          const parsedValue = this.schema.parse(value);
          return parsedValue;
        }
        return value;
      } else {
        const parsedValue = this.schema.parse(value);
        return parsedValue;
      }
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Zod validation failed:', error.issues);
        const message = error.issues.map(i => i.message).join(', ');
        throw new BadRequestException(message);
      }
      throw new BadRequestException("validation failed");
    }
  }
}

