import AppDataSource from "../../data-source";

import { hash } from "bcryptjs";

import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IUser } from "../../interfaces/users";
import { Account } from "../../entities/accounts.entity";

const userCreateService = async ({
  username,
  password,
}: IUser): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);
  const accountRepo = AppDataSource.getRepository(Account);

  const alreadyExists = await userRepo.findOneBy({
    username,
  });

  if (alreadyExists) {
    throw new AppError("Username indisponível", 400);
  }

  const account = accountRepo.create({
    balance: 100,
  });

  await accountRepo.save(account);

  const hashedPassword = await hash(password, 10);

  const user = userRepo.create({
    account,
    username,
    password: hashedPassword,
  });

  await userRepo.save(user);

  return user;
};

export default userCreateService;
