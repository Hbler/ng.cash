import { Request, Response } from "express";

import { ICashOut } from "../interfaces/cashOut";
import cashInsReadService from "../services/transactions/cashInsRead.service";
import cashOutCreateService from "../services/transactions/cashOutCreate.service";
import cashOutsReadService from "../services/transactions/cashOutsRead.service";
import transactionsDateFilterReadService from "../services/transactions/transactionsDateFilterRead.service";
import transactionsReadService from "../services/transactions/transactionsRead.service";

export const cashOutCreateController = async (req: Request, res: Response) => {
  const transactionData: ICashOut = req.body;
  const sender_id = req.user.id;

  const transaction = await cashOutCreateService(sender_id, {
    ...transactionData,
  });

  return res.status(201).json(transaction);
};

export const transactionsReadController = async (
  req: Request,
  res: Response
) => {
  const user_id = req.user.id;

  const transactions = await transactionsReadService(user_id);

  return res.json(transactions);
};

export const transactionsDateFilterReadController = async (
  req: Request,
  res: Response
) => {
  const user_id = req.user.id;
  const date = req.params.date;

  const transactions = await transactionsDateFilterReadService(user_id, date);

  return res.json(transactions);
};

export const cashOutsReadController = async (req: Request, res: Response) => {
  const user_id = req.user.id;

  const transactions = await cashOutsReadService(user_id);

  return res.json(transactions);
};

export const cashInsReadController = async (req: Request, res: Response) => {
  const user_id = req.user.id;

  const transactions = await cashInsReadService(user_id);

  return res.json(transactions);
};
