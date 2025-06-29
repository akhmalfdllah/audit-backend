import { ZodSchema } from 'zod';

export function zodValidator(schema: ZodSchema) {
    return (config: Record<string, any>) => {
        const result = schema.safeParse(config);
        if (!result.success) {
            throw new Error('❌ Invalid environment variables: ' + JSON.stringify(result.error.format()));
        }
        return config;
    };
}
