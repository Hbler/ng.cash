import * as yup from "yup";
import { SchemaOf } from "yup";

import { IUser } from "../interfaces/users";

export const userSchema: SchemaOf<IUser> = yup.object().shape({
  username: yup.string().required().min(3),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/(?=.*\d)(?=.*[A-Z])/),
});
