// src/shared/guards/api-key.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Request } from 'express';
import { UserRepository } from 'src/core/user/repositories/user.repository';
import { ErpAuthenticatedUser } from 'src/types/erp-authenticated-user.type';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    constructor(
        @Inject(UserRepository) private readonly userRepository: UserRepository
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const apiKey = request.headers['x-api-key'];
        console.log("📥 Header x-api-key:", apiKey);
        if (!apiKey || typeof apiKey !== 'string') {
            throw new UnauthorizedException('API key is required');
        }
        console.log("🔍 Mencari user by API key...");
        const user = await this.userRepository.findByApiKey(apiKey);

        if (!user) {
            console.log("❌ Tidak ditemukan user untuk API key:", apiKey);
            throw new UnauthorizedException('Invalid API key');
        }
        console.log("✅ User ditemukan:", {
            id: user.id,
            role: user.role,
            status: user.status
        });

        request.user = {
            id: user.id,
            fullName: user.fullName,
            role: user.role,
        } as ErpAuthenticatedUser;

        return true;
    }
}
