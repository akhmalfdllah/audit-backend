// src/shared/decorators/api-key-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedUser } from 'src/types/jwt.type';

export const ApiKeyUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): DecodedUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
