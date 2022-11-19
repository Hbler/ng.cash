import { compare } from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken";

import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/AppError";
import { IUser } from "../../interfaces/users";

import AppDataSource from "../../data-source";

const sessionCreateService = async ({
  username,
  password,
}: IUser): Promise<string> => {
  const userRepo = AppDataSource.getRepository(User);

  const user = await userRepo.findOne({ where: { username: username } });

  if (!user) {
    throw new AppError("Credenciais inválidas", 403);
  }

  const matchPassword = await compare(password, user.password);

  if (!matchPassword) {
    throw new AppError("Credenciais inválidas", 403);
  }

  const token = jwt.sign(
    {
      username: user.username,
    },
    process.env.SECRET_KEY as string,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );

  return token;
};

export default sessionCreateService;
