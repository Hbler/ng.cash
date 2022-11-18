import { IUser } from "../../interfaces/users";
import { ICashOut } from "../../interfaces/cashOut";

export const userWrongUsername: IUser = {
  username: "wr",
  password: "1234ABCD",
};

export const userShortPassword: IUser = {
  username: "user_one",
  password: "abcd",
};
export const userNoNumberPassword: IUser = {
  username: "user_one",
  password: "abcdefgH",
};
export const userNoUpperPassword: IUser = {
  username: "user_one",
  password: "abcd1234",
};

export const userOne: IUser = {
  username: "user_one",
  password: "1234ABCD",
};

export const userTwo: IUser = {
  username: "user_two",
  password: "1234ABCD",
};

export const cashOutWrongUsername: ICashOut = {
  receiver: "wr",
  value: 100,
};

export const cashOutWrongValue: ICashOut = {
  receiver: "user_two",
  value: 0,
};

export const cashOutWrongReceiver: ICashOut = {
  receiver: "user_one",
  value: 100,
};

export const cashOut: ICashOut = {
  receiver: "user_two",
  value: 100,
};

export const cashOutTwo: ICashOut = {
  receiver: "user_one",
  value: 50,
};
