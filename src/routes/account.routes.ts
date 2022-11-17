import { Router } from "express";

import { balanceReadController } from "../controllers/accounts.controllers";

import tokenValidationMiddleware from "../middlewares/tokenValidation.middleware";

const routes = Router();

export const accountRoutes = () => {
  routes.get("", tokenValidationMiddleware, balanceReadController);

  return routes;
};
