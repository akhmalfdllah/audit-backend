import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { DecodedUser } from "src/types/jwt.type";

export const User = createParamDecorator(
  (data: keyof DecodedUser | undefined, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user as DecodedUser;

    // Jika `@User('id')`, ambil sebagian
    if (data) {
      return user?.[data];
    }

    // Jika `@User()`, ambil seluruh objek
    return user;
  },
);