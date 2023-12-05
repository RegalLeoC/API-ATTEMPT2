import 'reflect-metadata';
import { createConnection } from 'typeorm';

export const AppDataSource = createConnection({
    type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '@Ak47gamer',
  database: 'supermarket',
  synchronize: false,
  logging: true,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: [],
});