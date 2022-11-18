import AppDataSource from "../../data-source";
import { Account } from "../../entities/accounts.entity";

import { Transaction } from "../../entities/transactions.entity";
import { User } from "../../entities/users.entity";

const transactionsReadService = async (id: string): Promise<Transaction[]> => {
  const userRepo = AppDataSource.getRepository(User);
  const transactionsRepo = AppDataSource.getRepository(Transaction);

  const user = await userRepo.findOneBy({ id });

  if (!user) {
    throw new Error();
  }

  const userTransactions = await transactionsRepo.find({
    where: [
      { debitedAccount: user.account },
      { creditedAccount: user.account },
    ],
  });

  return userTransactions;
};

export default transactionsReadService;
