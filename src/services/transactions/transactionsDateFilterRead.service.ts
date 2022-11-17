import AppDataSource from "../../data-source";

import { Transaction } from "../../entities/transactions.entity";
import { User } from "../../entities/users.entity";

const transactionsDateFilterReadService = async (
  id: string,
  date: string
): Promise<Transaction[]> => {
  const userRepo = AppDataSource.getRepository(User);
  const trasactionsRepo = AppDataSource.getRepository(Transaction);

  const user = await userRepo.findOneBy({ id });

  if (!user) {
    throw new Error();
  }

  const transactionDate = new Date(date);

  const userTransactions = await trasactionsRepo.find({
    where: [
      { debitedAccountId: user.account, createdAt: transactionDate },
      { creditedAccountId: user.account, createdAt: transactionDate },
    ],
  });

  return userTransactions;
};

export default transactionsDateFilterReadService;
