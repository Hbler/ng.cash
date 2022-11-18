import { Express } from "express";

import { accountRoutes } from "./account.routes";
import { sessionRoutes } from "./session.routes";
import { transactionRoutes } from "./transaction.routes";
import { userRoutes } from "./user.routes";

export const appRoutes = (app: Express) => {
  app.use("/login", sessionRoutes());
  app.use("/users", userRoutes());
  app.use("/accounts", accountRoutes());
  app.use("/transactions", transactionRoutes());
};
