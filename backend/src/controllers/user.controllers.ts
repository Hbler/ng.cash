import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

import { IUser } from "../interfaces/users";
import userCreateService from "../services/users/userCreate.service";
import userReadService from "../services/users/userRead.service";

export const userCreateController = async (req: Request, res: Response) => {
  const userData: IUser = req.body;
  const user = await userCreateService({ ...userData });

  return res.status(201).json(user);
};

export const userReadController = async (req: Request, res: Response) => {
  const user_id = req.user.id;

  const user = await userReadService(user_id);

  return res.json(instanceToPlain(user));
};
