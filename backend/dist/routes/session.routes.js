"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = void 0;
const express_1 = require("express");
const sessions_controllers_1 = require("../controllers/sessions.controllers");
const routes = (0, express_1.Router)();
const sessionRoutes = () => {
    routes.post("", sessions_controllers_1.sessionCreateController);
    return routes;
};
exports.sessionRoutes = sessionRoutes;
