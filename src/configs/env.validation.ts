import { z } from 'zod';

export const envValidationSchema = z.object({
    // Database
    DB_HOST: z.string(),
    DB_PORT: z.string().regex(/^\d+$/),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),

    // JWT
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),
    JWT_REFRESH_SECRET: z.string(),
    JWT_REFRESH_EXPIRES_IN: z.string(),

    // Cookie
    COOKIE_NAME: z.string(),
    COOKIE_SECURE: z.string().optional(),
    COOKIE_MAX_AGE: z.string(),

    // App
    PORT: z.string().optional(),
});
export default envValidationSchema;
