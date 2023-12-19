"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
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
});
//# sourceMappingURL=data-source.js.map