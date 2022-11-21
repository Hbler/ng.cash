"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionRoutes = void 0;
const express_1 = require("express");
const transaction_controllers_1 = require("../controllers/transaction.controllers");
const cashOut_schema_1 = require("../schemas/cashOut.schema");
const schemaValidation_middleware_1 = __importDefault(require("../middlewares/schemaValidation.middleware"));
const tokenValidation_middleware_1 = __importDefault(require("../middlewares/tokenValidation.middleware"));
const routes = (0, express_1.Router)();
const transactionRoutes = () => {
    routes.post("", tokenValidation_middleware_1.default, (0, schemaValidation_middleware_1.default)(cashOut_schema_1.cashOutSchema), transaction_controllers_1.cashOutCreateController);
    routes.get("", tokenValidation_middleware_1.default, transaction_controllers_1.transactionsReadController);
    routes.get("/cashouts", tokenValidation_middleware_1.default, transaction_controllers_1.cashOutsReadController);
    routes.get("/cashins", tokenValidation_middleware_1.default, transaction_controllers_1.cashInsReadController);
    routes.get("/:date", tokenValidation_middleware_1.default, transaction_controllers_1.transactionsDateFilterReadController);
    return routes;
};
exports.transactionRoutes = transactionRoutes;
