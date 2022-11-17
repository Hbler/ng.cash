import { Router } from "express";

import { sessionCreateController } from "../controllers/sessions.controllers";

const routes = Router();

export const sessionRoutes = () => {
  routes.post("", sessionCreateController);

  return routes;
};
