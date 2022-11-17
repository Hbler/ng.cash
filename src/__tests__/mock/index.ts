import { IUser } from "../../interfaces/users";
import { ICashOut } from "../../interfaces/cashOut";

export const userWrongUsername: IUser = {
  username: "wr",
  password: "1234ABCD",
};

export const userWrongPassword: IUser = {
  username: "user_one",
  password: "abcd",
};

export const userOne: IUser = {
  username: "user_one",
  password: "1234ABCD",
};

export const userTwo: IUser = {
  username: "user_two",
  password: "1234ABCD",
};

export const cashOutWrongReciver: ICashOut = {
  reciver: "wr",
  value: 100,
};

export const cashOutWrongValue: ICashOut = {
  reciver: "user_two",
  value: 0,
};

export const cashOut: ICashOut = {
  reciver: "user_two",
  value: 100,
};
