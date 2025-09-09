// import { z } from 'zod';
// export const envValidationSchema = z.object({
//     // App
//     PORT: z.string().optional(),

//     // Database (pakai DATABASE_URL saja, bukan DB_HOST dst.)
//     DATABASE_URL: z.string().url(),

//     // JWT
//     JWT_SECRET: z.string(),
//     REFRESH_TOKEN_SECRET: z.string(),
//     JWT_EXPIRES_IN: z.string(),
//     JWT_REFRESH_EXPIRES_IN: z.string(),
//     JWT_ROLE_KEY: z.string(),

//     // Cookie
//     COOKIE_NAME: z.string(),
//     COOKIE_SECURE: z.string().optional(),
//     COOKIE_MAX_AGE: z.string(),
//     COOKIE_SAMESITE: z.string().optional(),

//     // API Key ERP
//     API_KEY_SECRET: z.string(),

//     // Argon2
//     ARGON_SECRET_KEY: z.string(),
//     ARGON_SALT: z.string(),
//     ARGON_TIME_COST: z.string().regex(/^\d+$/),
//     ARGON_MEMORY_COST: z.string().regex(/^\d+$/),
//     ARGON_PARALLELISM: z.string().regex(/^\d+$/),

//     // CORS Frontend
//     FRONTEND_URL: z.string().url(),
// });

// export default envValidationSchema;

import { z } from "zod";

export const envValidationSchema = z.object({
    PORT: z.string().default("3000"),

    DATABASE_URL: z.string().url(),
    DB_HOST: z.string(),
    DB_PORT: z.string(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),

    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(), // bisa 15m, 7d, dsb

    JWT_REFRESH_SECRET: z.string(),
    JWT_REFRESH_EXPIRES_IN: z.string(),

    COOKIE_NAME: z.string(),
    COOKIE_SECURE: z
        .string()
        .transform((val) => val === "true")
        .default("false"),
    COOKIE_MAX_AGE: z.string(),

    ARGON_SECRET_KEY: z.string(),
    ARGON_SALT: z.string(),
    ARGON_TIME_COST: z.string(),
    ARGON_MEMORY_COST: z.string(),
    ARGON_PARALLELISM: z.string(),
});

export default envValidationSchema;
