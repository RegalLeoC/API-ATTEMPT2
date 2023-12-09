import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    
    "type": "mysql",
    "host": "3.224.24.153",
    "port": 3306,
    "username": "admin",
    "password": "admin",
    "database": "supermarket",
    synchronize: false,
    logging: true,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: [],
})