import { useForm, useInput } from "lx-react-form";

import { ContextUser } from "../../providers/userProvider";

import Form from ".";
import API from "../../services/API";
import Btn from "../buttons";
import Input from "../input";
import { errorToast, successToast } from "../toasts";
import User from "../../models/User";
import { ContextTransaction } from "../../providers/trasactionProvider";

export default function CashOutForm() {
  const { user, setUser } = ContextUser();
  const { getTransactions } = ContextTransaction();

  const receiver = useInput({
    name: "receiver",
    minLength: 3,
    errorText: { minLength: "O username deve ter 3 caracteres no mínimo" },
  });

  const value = useInput({
    name: "value",
  });

  const cashOutForm = useForm({
    clearFields: true,
    formFields: [receiver, value],
    submitCallback: async (cashOutData) => {
      const { receiver, value } = cashOutData;

      const auth = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@ngcash:token")}`,
        },
      };

      API.post("/transactions", { receiver, value }, auth)
        .then(async (_) => {
          user.updateAccount();
          user.account.balance -= +value;

          localStorage.setItem("@ngcash:user", JSON.stringify(user));

          const update = new User(user.username, user.account, user.id);

          setUser(update);
          getTransactions();
          successToast("Cash Out realizado");
        })
        .catch((err) => {
          console.log(err);
          errorToast(err.response.data.message);
        });
    },
  });
  return (
    <>
      <h2>Cash Out</h2>
      <Form callback={cashOutForm.handleSubmit}>
        <Input
          label="Username"
          placeholder="Digite o username de quem vai receber"
          type="text"
          name="username"
          field={receiver}
          errors={receiver.error}
        />

        <Input
          label="Valor"
          placeholder="Digite o valor da transação"
          type="number"
          name="value"
          min={1}
          field={value}
          errors={value.error}
        />

        <Btn color="purple" type="submit">
          Enviar
        </Btn>
      </Form>
    </>
  );
}
