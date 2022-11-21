"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRoutes = void 0;
const account_routes_1 = require("./account.routes");
const session_routes_1 = require("./session.routes");
const transaction_routes_1 = require("./transaction.routes");
const user_routes_1 = require("./user.routes");
const appRoutes = (app) => {
    app.use("/login", (0, session_routes_1.sessionRoutes)());
    app.use("/users", (0, user_routes_1.userRoutes)());
    app.use("/accounts", (0, account_routes_1.accountRoutes)());
    app.use("/transactions", (0, transaction_routes_1.transactionRoutes)());
};
exports.appRoutes = appRoutes;
