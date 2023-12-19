"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = (0, typeorm_1.createConnection)({
    type: 'mysql',
    host: '3.224.24.153',
    port: 3306,
    username: 'admin',
    password: 'admin',
    database: 'supermarket',
    synchronize: false,
    logging: true,
    entities: ['dist/entities/**/*.js'],
    migrations: ['src/migrations/**/*.js'],
    subscribers: [],
});
//# sourceMappingURL=index.js.map