import type { User } from "src/core/user/entities/user.entity";
import { UserRole } from "src/configs/database.config";

export type JwtRole = `${UserRole}`;
export interface JwtParams extends Pick<User, "id" | "role"> {}
export interface JwtPayload extends Pick<JwtParams, "id" | "role"> {}
export interface DecodedUser extends JwtPayload {
  iat: number;
  exp: number;
}

