"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const user_schema_1 = require("../schemas/user.schema");
const schemaValidation_middleware_1 = __importDefault(require("../middlewares/schemaValidation.middleware"));
const tokenValidation_middleware_1 = __importDefault(require("../middlewares/tokenValidation.middleware"));
const routes = (0, express_1.Router)();
const userRoutes = () => {
    routes.post("", (0, schemaValidation_middleware_1.default)(user_schema_1.userSchema), user_controllers_1.userCreateController);
    routes.get("", tokenValidation_middleware_1.default, user_controllers_1.userReadController);
    return routes;
};
exports.userRoutes = userRoutes;
