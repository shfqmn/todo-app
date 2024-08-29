"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const Task_1 = require("./models/Task");
const User_1 = require("./models/User");
exports.default = {
    database: constants_1.DB_NAME,
    username: constants_1.DB_USERNAME,
    password: constants_1.DB_PASSWORD,
    host: constants_1.DB_HOST,
    port: constants_1.DB_PORT,
    logging: !constants_1.__prod__,
    synchronize: !constants_1.__prod__,
    type: constants_1.DB_TYPE,
    migrations: [path_1.default.join(__dirname, "./migrations/*")],
    entities: [Task_1.Task, User_1.User],
    cli: {
        migrationsDir: "src/migrations"
    }
};
//# sourceMappingURL=typeormConfig.js.map