"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const typeormConfig_1 = __importDefault(require("./typeormConfig"));
const task_1 = require("./resolvers/task");
exports.AppDataSource = new typeorm_1.DataSource(typeormConfig_1.default);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        yield (yield exports.AppDataSource.initialize()).runMigrations();
        const schema = yield (0, type_graphql_1.buildSchema)({
            resolvers: [
                task_1.TaskResolver
            ],
        });
        const apolloServer = new apollo_server_express_1.ApolloServer({ schema });
        yield apolloServer.start();
        apolloServer.applyMiddleware({ app });
        app.listen(4000, () => {
            console.log('Server started on http://localhost:4000/graphql');
        });
    });
}
startServer().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map