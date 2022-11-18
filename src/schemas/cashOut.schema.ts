import * as yup from "yup";
import { SchemaOf } from "yup";

import { ICashOut } from "../interfaces/cashOut";

export const cashOutSchema: SchemaOf<ICashOut> = yup.object().shape({
  receiver: yup.string().required().min(3, "Invalid receiver username"),
  value: yup
    .number()
    .required()
    .test(
      "Is positive?",
      "The value must be greater than 0",
      (value) => value! > 0
    ),
});
