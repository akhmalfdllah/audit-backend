import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.local';
config({ path: path.resolve(process.cwd(), envFile) });

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/infrastructure/database/migrations/*{.ts,.js}'],
    synchronize: false,
});
