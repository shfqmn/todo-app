"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.DB_TYPE = exports.DB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.__prod__ = void 0;
exports.__prod__ = process.env.NODE_ENV === "production";
exports.DB_HOST = "localhost";
exports.DB_PORT = 3306;
exports.DB_USERNAME = "root";
exports.DB_PASSWORD = "password";
exports.DB_TYPE = "mysql";
exports.DB_NAME = "todo";
//# sourceMappingURL=constants.js.map