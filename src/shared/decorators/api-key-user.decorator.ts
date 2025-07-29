// src/shared/decorators/api-key-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedUser } from 'src/types/jwt.type';

export const ApiKeyUser = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): DecodedUser => {
        try {
            const request = ctx.switchToHttp().getRequest();
            if (!request.user) {
                throw new Error('❌ ApiKeyUser decorator digunakan, tapi user tidak ditemukan di request');
            }
            return request.user;
        } catch (e) {
            throw new Error('❌ ApiKeyUser hanya boleh digunakan di endpoint dengan ApiKeyGuard');
        }
    },
);
