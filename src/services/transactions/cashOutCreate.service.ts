import AppDataSource from "../../data-source";

import { Account } from "../../entities/accounts.entity";
import { Transaction } from "../../entities/transactions.entity";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { ICashOut } from "../../interfaces/cashOut";

const cashOutCreateService = async (
  sender_id: string,
  { receiver, value }: ICashOut
): Promise<Transaction> => {
  const userRepo = AppDataSource.getRepository(User);
  const accountRepo = AppDataSource.getRepository(Account);
  const trasactionsRepo = AppDataSource.getRepository(Transaction);

  const senderUser = await userRepo.findOneBy({ id: sender_id });

  if (!senderUser) {
    throw new AppError("Bad request", 400);
  }

  const senderAccount = await accountRepo.findOneBy({
    id: senderUser.account.id,
  });

  if (!senderAccount) {
    throw new Error();
  }

  if (senderAccount.balance < value) {
    throw new AppError("Insufficient funds", 401);
  }

  const receiverUser = await userRepo.findOneBy({ username: receiver });

  if (!receiverUser) {
    throw new AppError("Username not found", 404);
  }

  if (senderUser.username === receiverUser.username) {
    throw new AppError("Can't make a transaction to yourself", 403);
  }

  const receiverAccount = await accountRepo.findOneBy({
    id: receiverUser.account.id,
  });

  if (!receiverAccount) {
    throw new Error();
  }

  await accountRepo.update(senderAccount.id, {
    balance: senderAccount.balance - value,
  });

  await accountRepo.update(receiverAccount.id, {
    balance: senderAccount.balance + value,
  });

  const transaction = trasactionsRepo.create({
    debitedAccount: senderAccount,
    creditedAccount: receiverAccount,
    value,
  });

  await trasactionsRepo.save(transaction);

  return transaction;
};

export default cashOutCreateService;
