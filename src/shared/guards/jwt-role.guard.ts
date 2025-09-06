import { Reflector } from "@nestjs/core";
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import type { DecodedUser, JwtRole } from "src/types/jwt.type";
import { JwtRoleKey } from "src/configs/jtw.constant";

@Injectable()
export class JwtRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<JwtRole[]>(JwtRoleKey, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: DecodedUser | undefined = request.user;

    if (!user) {
      throw new ForbiddenException("user not authenticated!");
    }

    // const hasRole = requiredRoles.some(role => role === user.role);
    // if (!hasRole) {
    //   throw new ForbiddenException(`required role(s): ${requiredRoles.join(", ")}`);
    // }
console.log('[JwtRolesGuard] Required:', requiredRoles);
console.log('[JwtRolesGuard] User role:', user.role);
console.log('[JwtRolesGuard] Role match:', requiredRoles.includes(user.role as JwtRole));

    return true;
  }
}
