import { applyDecorators, UseGuards } from "@nestjs/common";
import { match } from "ts-pattern";
import { JwtRefreshGuard } from "src/shared/guards/jwt-refresh.guard";
import { JwtAccessGuard } from "src/shared/guards/jwt-access.guard";
import { JwtRolesGuard } from "src/shared/guards/jwt-role.guard";
import { Roles, JwtRole } from "./roles.decorator";

export function TokenGuard(roles?: [JwtRole, ...JwtRole[]]) {
  return match(roles)
    .with(undefined, null, () => applyDecorators(UseGuards(JwtRefreshGuard, JwtAccessGuard)))
    .otherwise(() =>
      applyDecorators(Roles(...roles), UseGuards(JwtRefreshGuard, JwtAccessGuard, JwtRolesGuard)),
    );
}
