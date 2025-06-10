import { SetMetadata } from "@nestjs/common";
import type { JwtRole } from "src/types/jwt.type";
import { JwtRoleKey } from "src/configs/jwt.config";

export const Roles = (...roles: JwtRole[]) => SetMetadata(JwtRoleKey, roles);
export const allRoles: JwtRole[] = ["admin", "user"];
export type { JwtRole };
