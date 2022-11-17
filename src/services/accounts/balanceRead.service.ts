import AppDataSource from "../../data-source";
import { Account } from "../../entities/accounts.entity";
import { User } from "../../entities/users.entity";
import { IBalanceResponse } from "../../interfaces/accounts";

const balanceReadService = async (id: string): Promise<IBalanceResponse> => {
  const userRepo = AppDataSource.getRepository(User);
  const accountRepo = AppDataSource.getRepository(Account);

  const user = await userRepo.findOneBy({ id });

  if (!user) {
    throw new Error();
  }

  const account = await accountRepo.findOneBy({
    id: user.account.id,
  });

  if (!account) {
    throw new Error();
  }

  return { balance: account.balance };
};

export default balanceReadService;
