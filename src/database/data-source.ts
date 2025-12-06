import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const dir = process.env.NODE_ENV?.trim() === 'production' ? 'dist' : 'src';

export const AppDataSource = new DataSource({
  type: (process.env.DB_TYPE as 'postgres') || 'postgres',
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  migrations: [`./${dir}/database/migrations/*{.ts,.js}`],
  entities: [`./${dir}/modules/**/entities/*{.ts,.js}`],
  synchronize: false, // Nunca use true em produção
  logging: process.env.NODE_ENV === 'development',
});
