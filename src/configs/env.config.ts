export const APP_PORT = Number (process.env.APP_PORT || 7000);

//Database env
export const DB_TYPE = process.env.DB_TYPE || "postgres";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PORT = Number(process.env.DB_PORT || 5432);
export const DB_USERNAME = process.env.DB_USERNAME || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_DATABASE_NAME = process.env.DB_DATABASE_NAME || "my_system_audit";

//Argon env
export const ARGON_SECRET_KEY = process.env.ARGON_SECRET_KEY || "ngoerby.com";
export const ARGON_SALT = process.env.ARGON_SALT || "akhmal_ngoerby";