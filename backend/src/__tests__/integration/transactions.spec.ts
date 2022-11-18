import request from "supertest";
import { DataSource } from "typeorm";

import app from "../../app";
import AppDataSource from "../../data-source";
import {
  cashOut,
  cashOutTwo,
  cashOutWrongReceiver,
  cashOutWrongUsername,
  cashOutWrongValue,
  userOne,
  userTwo,
} from "../mock";

describe("Testing transactions routes middlewares and controllers", () => {
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

  it("Should not be able to make a cash-out transaction without token", async () => {
    await request(app).post("/users").send(userOne);
    await request(app).post("/users").send(userTwo);

    const response = await request(app).post("/transactions");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Invalid token");
  });

  it("Should not be able to make a cash-out transaction with wrong value", async () => {
    const login = await request(app).post("/login").send(userOne);

    const response = await request(app)
      .post("/transactions")
      .send(cashOutWrongValue)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("The value must be greater than 0");
  });

  it("Should not be able to make a cash-out transaction with invalid receiver", async () => {
    const login = await request(app).post("/login").send(userOne);

    const response = await request(app)
      .post("/transactions")
      .send(cashOutWrongUsername)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Invalid receiver username");
  });

  it("Should not be able to make a cash-out transaction with to self", async () => {
    const login = await request(app).post("/login").send(userOne);

    const response = await request(app)
      .post("/transactions")
      .send(cashOutWrongReceiver)
      .set("Authorization", `Bearer ${login.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe("Can't make a transaction to yourself");
  });

  it("Should be able to make a cash-out transaction", async () => {
    const login_one = await request(app).post("/login").send(userOne);
    const login_two = await request(app).post("/login").send(userTwo);

    const response = await request(app)
      .post("/transactions")
      .send(cashOut)
      .set("Authorization", `Bearer ${login_one.body.token}`);

    const date = new Date();

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("value");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("debitedAccount");
    expect(response.body).toHaveProperty("creditedAccount");

    expect(response.body.value).toBe(cashOut.value);
    expect(new Date(response.body.createdAt).setHours(0, 0, 0, 0)).toBe(
      date.setHours(0, 0, 0, 0)
    );

    const user_two_balance = await request(app)
      .get("/accounts")
      .set("Authorization", `Bearer ${login_two.body.token}`);

    expect(user_two_balance.status).toBe(200);
    expect(user_two_balance.body).toHaveProperty("balance");
    expect(user_two_balance.body.balance).toBe(200);
  });

  it("Should be able to list all related transactions", async () => {
    const login_one = await request(app).post("/login").send(userOne);
    const login_two = await request(app).post("/login").send(userTwo);

    await request(app)
      .post("/transactions")
      .send(cashOutTwo)
      .set("Authorization", `Bearer ${login_two.body.token}`);

    const response = await request(app)
      .get("/transactions")
      .set("Authorization", `Bearer ${login_one.body.token}`);

    expect(response.body instanceof Array).toBe(true);
    expect(response.body.length).toBe(2);

    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0]).toHaveProperty("value");
    expect(response.body[0]).toHaveProperty("createdAt");
  });

  it("Should be able to list all related cash-out transactions", async () => {
    const login_one = await request(app).post("/login").send(userOne);

    const response = await request(app)
      .get("/transactions/cashouts")
      .set("Authorization", `Bearer ${login_one.body.token}`);

    expect(response.body instanceof Array).toBe(true);
    expect(response.body.length).toBe(1);

    expect(response.body[0].value).toBe(cashOut.value);
  });

  it("Should be able to list all related cash-in transactions", async () => {
    const login_one = await request(app).post("/login").send(userOne);

    const response = await request(app)
      .get("/transactions/cashins")
      .set("Authorization", `Bearer ${login_one.body.token}`);

    expect(response.body instanceof Array).toBe(true);
    expect(response.body.length).toBe(1);

    expect(response.body[0].value).toBe(cashOutTwo.value);
  });

  it("Should be able to filter transactions by date", async () => {
    const login_one = await request(app).post("/login").send(userOne);

    const date = new Date();

    const response = await request(app)
      .get(`/transactions/${date.toDateString()}`)
      .set("Authorization", `Bearer ${login_one.body.token}`);

    expect(response.body instanceof Array).toBe(true);
    expect(response.body.length).toBe(2);
  });
});
