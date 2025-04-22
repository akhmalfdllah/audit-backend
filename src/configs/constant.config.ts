import { join } from 'path';

export const Mode = process.env?.NODE_ENV.trim() || 'development';
export const EnvPath = `environtments/.env.${Mode}`;
export const RootDir = join(__dirname, '..', '..');
export const StaticRootPath = join(RootDir, 'public');

export const isProduction = (): boolean => {
    return Mode === 'production';
};
