require('dotenv').config();

export const JwtAccessName = process.env.JWT_ACCESS_NAME || 'access_token';
export const JwtAccessSecretKey = process.env.JWT_SECRET || 'default_secret'; 
export const JwtRefreshName = process.env.JWT_REFRESH_NAME || 'refresh_token';
export const JwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET || 'default_refresh';
export const JwtRoleKey = process.env.JWT_ROLE_KEY || 'role';
