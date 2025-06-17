import { IntersectionType } from "@nestjs/swagger";
import { createUserBodySchema, CreateUserBodyDto } from "src/applications/user/dto/create-user-body.dto";

export const signUpBodySchema = createUserBodySchema;
export class SignUpBodyDto extends IntersectionType(CreateUserBodyDto) {}
