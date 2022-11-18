import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { User } from "../../entities/users.entity";
import cashInsReadService from "../../services/transactions/cashInsRead.service";
import cashOutCreateService from "../../services/transactions/cashOutCreate.service";
import cashOutsReadService from "../../services/transactions/cashOutsRead.service";
import transactionsDateFilterReadService from "../../services/transactions/transactionsDateFilterRead.service";
import transactionsReadService from "../../services/transactions/transactionsRead.service";
import userCreateService from "../../services/users/userCreate.service";
import { cashOut, userOne, userTwo } from "../mock";

describe("Testing transaction services", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        console.log(error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("Should not be able to create a transaction to 'yourself'", async () => {
    const user_two = await userCreateService(userTwo);

    await expect(async () => {
      await cashOutCreateService(user_two!.id, { ...cashOut });
    }).rejects.toThrow("Can't make a transaction to yourself");
  });

  it("Should be able to create a transaction", async () => {
    const user_one = await userCreateService(userOne);

    const result = await cashOutCreateService(user_one!.id, { ...cashOut });

    const date = new Date();

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("value");
    expect(result).toHaveProperty("createdAt");
    expect(result).toHaveProperty("debitedAccount");
    expect(result).toHaveProperty("creditedAccount");

    expect(result.value).toBe(cashOut.value);
    expect(result.createdAt.setHours(0, 0, 0, 0)).toBe(
      date.setHours(0, 0, 0, 0)
    );
  });

  it("Should not be able to create a transaction with insufficient funds", async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ username: "user_one" });

    await expect(async () => {
      await cashOutCreateService(user!.id, { ...cashOut });
    }).rejects.toThrow("Insufficient funds");
  });

  it("Should be able to get all transactions", async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ username: "user_one" });

    const result = await transactionsReadService(user!.id);

    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(1);

    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("value");
    expect(result[0]).toHaveProperty("createdAt");

    expect(result[0].value).toBe(100);
  });

  it("Should be able to get cash-out transactions", async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ username: "user_one" });

    const result = await cashOutsReadService(user!.id);

    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(1);

    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("value");
    expect(result[0]).toHaveProperty("createdAt");

    expect(result[0].value).toBe(100);
  });

  it("Should be able to get cash-in transactions", async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ username: "user_two" });

    const result = await cashInsReadService(user!.id);

    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(1);

    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("value");
    expect(result[0]).toHaveProperty("createdAt");

    expect(result[0].value).toBe(100);
  });

  it("Should be able to get transactions by date", async () => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOneBy({ username: "user_one" });

    const date = new Date().toDateString();

    const result = await transactionsDateFilterReadService(user!.id, date);

    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(1);

    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("value");
    expect(result[0]).toHaveProperty("createdAt");

    expect(result[0].value).toBe(100);
  });
});
