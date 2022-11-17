import AppDataSource from "../../data-source";

import { Transaction } from "../../entities/transactions.entity";
import { User } from "../../entities/users.entity";

const transactionsReadService = async (id: string): Promise<Transaction[]> => {
  const userRepo = AppDataSource.getRepository(User);
  const trasactionsRepo = AppDataSource.getRepository(Transaction);

  const user = await userRepo.findOneBy({ id });

  if (!user) {
    throw new Error();
  }

  const userTransactions = await trasactionsRepo.find({
    where: [
      { debitedAccountId: user.account },
      { creditedAccountId: user.account },
    ],
  });

  return userTransactions;
};

export default transactionsReadService;
