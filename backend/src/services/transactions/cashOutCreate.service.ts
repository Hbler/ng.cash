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
    throw new Error();
  }

  const senderAccount = await accountRepo.findOneBy({
    id: senderUser.account.id,
  });

  if (!senderAccount) {
    throw new Error();
  }

  if (senderAccount.balance < value) {
    throw new AppError("Saldo nsuficiente", 401);
  }

  const receiverUser = await userRepo.findOneBy({ username: receiver });

  if (!receiverUser) {
    throw new AppError("Username não encontrado", 404);
  }

  if (senderUser.username === receiverUser.username) {
    throw new AppError("Não é possível transferir para a própria conta", 403);
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
    balance: receiverAccount.balance + value,
  });

  const transaction = trasactionsRepo.save({
    debitedAccount: senderAccount,
    creditedAccount: receiverAccount,
    value,
  });

  return transaction;
};

export default cashOutCreateService;
