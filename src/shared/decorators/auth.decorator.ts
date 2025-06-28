import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from './roles.decorator';
import { JwtAccessGuard } from 'src/shared/guards/jwt-access.guard';
import { JwtRolesGuard } from 'src/shared/guards/jwt-role.guard';
import { UserRole } from 'src/core/user/entities/user.entity'; // sesuaikan path-nya

export function Auth(...roles: UserRole[]) {
    const decorators = [UseGuards(JwtAccessGuard)];

    if (roles.length > 0) {
        decorators.push(UseGuards(JwtRolesGuard), Roles(...roles));
    }

    return applyDecorators(...decorators);
}
