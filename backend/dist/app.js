"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const handleError_middleware_1 = __importDefault(require("./middlewares/handleError.middleware"));
const routes_1 = require("./routes");
const cors = require("cors");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
(0, routes_1.appRoutes)(app);
app.use(handleError_middleware_1.default);
exports.default = app;
