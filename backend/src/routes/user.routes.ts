import { Router } from "express";

import {
  userCreateController,
  userReadController,
} from "../controllers/user.controllers";
import { userSchema } from "../schemas/user.schema";

import schemaValidationMiddleware from "../middlewares/schemaValidation.middleware";
import tokenValidationMiddleware from "../middlewares/tokenValidation.middleware";

const routes = Router();

export const userRoutes = () => {
  routes.post("", schemaValidationMiddleware(userSchema), userCreateController);
  routes.get("", tokenValidationMiddleware, userReadController);

  return routes;
};
