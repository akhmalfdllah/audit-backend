import { IntersectionType } from "@nestjs/swagger";
import { verifyUserBodySchema, VerifyUserBodyDto } from "src/applications/user/dto/verify-user-body.dto";

export const signInBodySchema = verifyUserBodySchema;
export class SignInBodyDto extends IntersectionType(VerifyUserBodyDto) {}
