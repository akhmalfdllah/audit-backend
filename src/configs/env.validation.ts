import { z } from "zod";

export const envValidationSchema = z.object({
    // 🌐 App
    PORT: z.string().default("3000"),

    // 🛢️ Database
    DATABASE_URL: z.string().url(),

    // 📦 Frontend
    FRONTEND_URL: z.string().url(),

    // 🔑 ERP
    AUDIT_BACKEND_URL: z.string().url(),
    ERP_API_KEY: z.string(),
    ENABLE_ERP_SCHEDULER: z
        .string()
        .transform((val) => val === "true")
        .default("false"),
    SEND_INTERVAL_CRON: z.string().default("* * * * *"),

    // 🔐 JWT Access Token
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(), // contoh: "15m", "1h"

    // 🔐 JWT Refresh Token
    JWT_REFRESH_SECRET: z.string(),
    JWT_REFRESH_EXPIRES_IN: z.string(),

    // 🍪 Cookie
    COOKIE_NAME: z.string(),
    COOKIE_SECURE: z
        .string()
        .transform((val) => val === "true")
        .default("false"),
    COOKIE_MAX_AGE: z.string(),

    // 🔒 Argon2 Config
    ARGON_SECRET_KEY: z.string(),
    ARGON_SALT: z.string(),
    ARGON_TIME_COST: z.string(),
    ARGON_MEMORY_COST: z.string(),
    ARGON_PARALLELISM: z.string(),
});

export default envValidationSchema;
