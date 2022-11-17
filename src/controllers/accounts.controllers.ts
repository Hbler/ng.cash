import { Request, Response } from "express";
import balanceReadService from "../services/accounts/balanceRead.service";

export const balanceReadController = async (req: Request, res: Response) => {
  const user_id = req.user.id;

  const balance = await balanceReadService(user_id);

  return res.json(balance);
};
