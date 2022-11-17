import { Router } from "express";

import {
  cashInsReadController,
  cashOutCreateController,
  cashOutsReadController,
  transactionsDateFilterReadController,
  transactionsReadController,
} from "../controllers/transaction.controllers";
import { cashOutSchema } from "../schemas/cashOut.schema";

import schemaValidationMiddleware from "../middlewares/schemaValidation.middleware";
import tokenValidationMiddleware from "../middlewares/tokenValidation.middleware";

const routes = Router();

export const transactionRoutes = () => {
  routes.post(
    "",
    tokenValidationMiddleware,
    schemaValidationMiddleware(cashOutSchema),
    cashOutCreateController
  );
  routes.get("", tokenValidationMiddleware, transactionsReadController);
  routes.get("/cashouts", tokenValidationMiddleware, cashOutsReadController);
  routes.get("/cashins", tokenValidationMiddleware, cashInsReadController);
  routes.get(
    "/:date",
    tokenValidationMiddleware,
    transactionsDateFilterReadController
  );

  return routes;
};
