import type { JwtSignOptions } from "@nestjs/jwt";
import {
  JWT_ROLE_KEY,
  JWT_ACCESS_NAME,
  JWT_ACCESS_SECRET_KEY,
  JWT_ACCESS_EXPIRE_IN,
  JWT_REFRESH_NAME,
  JWT_REFRESH_SECRECT_KEY,
  JWT_REFRESH_EXPIRE_IN,
  JWT_COMMON_SECRECT_KEY,
  JWT_COMMON_EXPIRE_IN,
} from "src/configs/env.config";

export const JwtAccessName = JWT_ACCESS_NAME;
export const JwtAccessSecretKey = JWT_ACCESS_SECRET_KEY;
export const JwtAccessSignOptions: JwtSignOptions = {
  secret: JWT_ACCESS_SECRET_KEY,
  expiresIn: JWT_ACCESS_EXPIRE_IN,
};

export const JwtRefreshName = JWT_REFRESH_NAME;
export const JwtRefreshSecretKey = JWT_REFRESH_SECRECT_KEY;
export const JwtRefreshSignOptions: JwtSignOptions = {
  secret: JWT_REFRESH_SECRECT_KEY,
  expiresIn: JWT_REFRESH_EXPIRE_IN,
};

// role-guard
export const JwtRoleKey = JWT_ROLE_KEY;

// custom-jwt
export const JwtCommonSecretKey = JWT_COMMON_SECRECT_KEY;
export const JwtCommonSignOptions: JwtSignOptions = {
  secret: JWT_COMMON_SECRECT_KEY,
  expiresIn: JWT_COMMON_EXPIRE_IN,
};
