import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { DecodedUser } from "src/types/jwt.type";

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as DecodedUser;
});
