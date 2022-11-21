import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import userCreateService from "../../services/users/userCreate.service";
import userReadService from "../../services/users/userRead.service";
import { userOne, userTwo } from "../mock";

describe("Testing user services", () => {
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

  it("Should be able to create an user with an account with the correct balance", async () => {
    const result = await userCreateService(userOne);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("account");
    expect(result).toHaveProperty("username");
    expect(result).toHaveProperty("password");

    expect(result.username).toBe(userOne.username);
    expect(result.password).not.toBe(userOne.password);
    expect(result.account.balance).toBe(100);
  });

  it("Should not be able to create an user with the same username", async () => {
    expect(async () => {
      await userCreateService(userOne);
    }).rejects.toThrow("Username indisponível");
  });

  it("Should be able to get an user", async () => {
    const newUser = await userCreateService(userTwo);
    const result = await userReadService(newUser.id);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("account");
    expect(result).toHaveProperty("username");
    expect(result).toHaveProperty("password");

    expect(result.username).toBe(userTwo.username);
  });
});
