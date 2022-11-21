"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRoutes = void 0;
const express_1 = require("express");
const accounts_controllers_1 = require("../controllers/accounts.controllers");
const tokenValidation_middleware_1 = __importDefault(require("../middlewares/tokenValidation.middleware"));
const routes = (0, express_1.Router)();
const accountRoutes = () => {
    routes.get("", tokenValidation_middleware_1.default, accounts_controllers_1.balanceReadController);
    return routes;
};
exports.accountRoutes = accountRoutes;
