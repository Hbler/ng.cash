import { User } from "../../entities/users.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";

const userReadService = async (id: string): Promise<User> => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOneBy({
    id,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export default userReadService;
