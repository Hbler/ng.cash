import { Between, Brackets, LessThan, MoreThan } from "typeorm";
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

  const addDays = (d: number, date: Date) => {
    return new Date(date.valueOf() + 864e5 * d);
  };

  const transactionDate = new Date(new Date(date).setHours(0, 0, 0, 0));
  const nextDayDate = addDays(1, transactionDate);

  const userTransactions = await trasactionsRepo.find({
    where: [
      {
        debitedAccount: user.account,
        createdAt: Between(transactionDate, nextDayDate),
      },
      {
        creditedAccount: user.account,
        createdAt: Between(transactionDate, nextDayDate),
      },
    ],
  });

  return userTransactions;
};

export default transactionsDateFilterReadService;
