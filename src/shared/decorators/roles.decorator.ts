import { SetMetadata } from "@nestjs/common";
import type { JwtRole } from "src/types/jwt.type";
import { JwtRoleKey } from "src/configs/jtw.constant";


export const Roles = (...roles: JwtRole[]) => SetMetadata(JwtRoleKey, roles);
export const allRoles: JwtRole[] = ["Auditor", "User"];
export type { JwtRole };
