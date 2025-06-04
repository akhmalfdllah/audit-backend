export const APP_PORT = Number (process.env.APP_PORT || 7000);

//Database env
export const DB_TYPE = process.env.DB_TYPE || "postgres";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = Number(process.env.DB_PORT || 5432);
export const DB_USERNAME = process.env.DB_USERNAME || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_DATABASE_NAME = process.env.DB_DATABASE_NAME || "my_system_audit";

// JWT env
export const JWT_ROLE_KEY = process.env.JWT_ROLE_KEY || "roles";
export const JWT_ACCESS_NAME = process.env.JWT_ACCESS_NAME || "jwt-access";
export const JWT_ACCESS_SECRET_KEY = process.env.JWT_ACCESS_SECRET_KEY || "";
export const JWT_ACCESS_EXPIRE_IN = process.env.JWT_ACCESS_EXPIRE_IN || "1d";
export const JWT_REFRESH_NAME = process.env.JWT_REFRESH_NAME || "jwt-refresh";
export const JWT_REFRESH_SECRECT_KEY = process.env.JWT_REFRESH_SECRECT_KEY || "";
export const JWT_REFRESH_EXPIRE_IN = process.env.JWT_REFRESH_EXPIRE_IN || "7d";
export const JWT_COMMON_SECRECT_KEY = process.env.JWT_COMMON_SECRECT_KEY || "jwt-common";
export const JWT_COMMON_EXPIRE_IN = process.env.JWT_COMMON_EXPIRE_IN || "1d";


//Argon env
export const ARGON_SECRET_KEY = process.env.ARGON_SECRET_KEY || "ngoerby.com";
export const ARGON_SALT = process.env.ARGON_SALT || "akhmal_ngoerby";