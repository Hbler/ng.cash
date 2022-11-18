import { Request, Response } from "express";

import { IUser } from "../interfaces/users";
import sessionCreateService from "../services/sessions/sessionCreate.service";

export const sessionCreateController = async (req: Request, res: Response) => {
  const { username, password }: IUser = req.body;

  const token = await sessionCreateService({ username, password });

  return res.json({ token });
};
