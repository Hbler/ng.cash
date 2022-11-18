import * as yup from "yup";
import { SchemaOf } from "yup";

import { IUser } from "../interfaces/users";

export const userSchema: SchemaOf<IUser> = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(3, "Username must have at least 3 characters"),
  password: yup
    .string()
    .required()
    .min(8, "Password must have at least 8 characters")
    .matches(
      /(?=.*\d)(?=.*[A-Z])/,
      "Password must have 1 number, 1 Upper case letter"
    ),
});
