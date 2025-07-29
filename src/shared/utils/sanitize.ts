export function sanitize<T extends Record<string, any>>(dto: T): T {
    return Object.fromEntries(
        Object.entries(dto).filter(
            ([_, value]) =>
                value !== undefined &&
                value !== null &&
                value !== '' &&
                value !== 'string'
        )
    ) as T;
}
