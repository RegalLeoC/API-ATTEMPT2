import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import {DetailsBuy} from "./entities/DetailsBuy"
import {Product} from "./entities/Product"
import {PromotionalProduct} from "./entities/PromotionalProduct"
import {Purchase} from "./entities/Purchase"

export const AppDataSource = new DataSource({
    
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "Cloud%%1234.",
    "database": "supermarket",
    synchronize: false,
    logging: true,
    entities: [User, DetailsBuy, Product, PromotionalProduct, Purchase],
    migrations: [],
    subscribers: [],
})