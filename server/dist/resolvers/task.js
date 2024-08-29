"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Task_1 = require("../models/Task");
let TaskResolver = class TaskResolver {
    tasks(id, limit = 50) {
        return __awaiter(this, void 0, void 0, function* () {
            const realLimit = Math.min(50, limit);
            const qb = Task_1.Task.getRepository()
                .createQueryBuilder('t')
                .orderBy('"createdAt"', 'DESC')
                .take(realLimit);
            return qb.getMany();
        });
    }
    createTask(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = Task_1.Task.getRepository().save({
                title,
                description,
            });
            console.log(task);
            return task;
        });
    }
    updateTask(id, title, description, completed) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield Task_1.Task.getRepository().findOneBy({ id });
            if (!task)
                return null;
            Task_1.Task.update({ id }, { title, description, completed });
            return task;
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Task_1.Task.getRepository().delete({ id });
            return true;
        });
    }
    findTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield Task_1.Task.getRepository().findOneBy({ id });
            if (!task)
                return null;
            return task;
        });
    }
};
exports.TaskResolver = TaskResolver;
__decorate([
    (0, type_graphql_1.Query)(() => [Task_1.Task]),
    __param(0, (0, type_graphql_1.Arg)('id', { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)('limit', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "tasks", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.Task),
    __param(0, (0, type_graphql_1.Arg)('title', () => String)),
    __param(1, (0, type_graphql_1.Arg)('description', () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "createTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Task_1.Task),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)('title', () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)('description', () => String, { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)('completed', () => Boolean, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "updateTask", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "deleteTask", null);
__decorate([
    (0, type_graphql_1.Query)(() => Task_1.Task, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskResolver.prototype, "findTask", null);
exports.TaskResolver = TaskResolver = __decorate([
    (0, type_graphql_1.Resolver)(Task_1.Task)
], TaskResolver);
//# sourceMappingURL=task.js.map