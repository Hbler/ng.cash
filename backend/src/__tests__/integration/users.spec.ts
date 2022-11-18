import request from "supertest";
import { DataSource } from "typeorm";

import app from "../../app";
import AppDataSource from "../../data-source";
import {
  userNoNumberPassword,
  userNoUpperPassword,
  userOne,
  userShortPassword,
  userTwo,
  userWrongUsername,
} from "../mock";

describe("Testing users, sessions and accounts routes middlewares and controllers", () => {
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

  it("Should not be able to create an user with invalid username", async () => {
    const response = await request(app).post("/users").send(userWrongUsername);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Username must have at least 3 characters"
    );
  });

  it("Should not be able to create an user with short password", async () => {
    const response = await request(app).post("/users").send(userShortPassword);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Password must have at least 8 characters"
    );
  });

  it("Should not be able to create an user with password without one number", async () => {
    const response = await request(app)
      .post("/users")
      .send(userNoNumberPassword);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Password must have 1 number, 1 Upper case letter"
    );
  });

  it("Should not be able to create an user with password without one uppercase letter", async () => {
    const response = await request(app)
      .post("/users")
      .send(userNoUpperPassword);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "Password must have 1 number, 1 Upper case letter"
    );
  });

  it("Should be able to login", async () => {
    await request(app).post("/users").send(userOne);

    const response = await request(app).post("/login").send(userOne);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should be able to get own balance", async () => {
    await request(app).post("/users").send(userTwo);

    const login = await request(app).post("/login").send(userOne);

    const response = await request(app)
      .get("/accounts")
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("balance");
    expect(response.body.balance).toBe(100);
  });
});
