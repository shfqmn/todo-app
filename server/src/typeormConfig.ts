import path from "path";
import { DataSourceOptions } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_TYPE, DB_USERNAME, __prod__ } from "./constants";
import { Task } from "./models/Task";
import { User } from "./models/User";

export default {
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    logging: !__prod__,
    synchronize: !__prod__,
    type: DB_TYPE,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Task, User],
    cli: {
        migrationsDir: "src/migrations"
    }
} as DataSourceOptions;