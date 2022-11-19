import { useForm, useInput } from "lx-react-form";

import { ContextUser } from "../../providers/userProvider";

import Form from ".";
import Input from "../input";
import Btn from "../buttons";

interface FormProps {
  callback: () => void;
}

export default function SignUpForm({ callback }: FormProps) {
  const { signUp } = ContextUser();

  const username = useInput({
    name: "username",
    minLength: 3,
    errorText: { minLength: "O username deve ter 3 caracteres no mínimo" },
  });

  const password = useInput({
    name: "password",
    customValidations: [
      {
        regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Z\d]{8,}$/,
        error:
          "Sua senha precisa conter 8 caracteres, pelo menos uma letra maiúscula e um número",
      },
    ],
  });

  const signUpForm = useForm({
    clearFields: true,
    formFields: [username, password],
    submitCallback: (userData) => {
      signUp(userData, callback);
    },
  });
  return (
    <>
      <h2>Cadastro</h2>
      <Form callback={signUpForm.handleSubmit}>
        <Input
          label="Username"
          placeholder="Digite um username"
          type="text"
          name="username"
          field={username}
          errors={username.error}
        />

        <Input
          label="Password"
          placeholder="Digite um password"
          type="password"
          name="password"
          field={password}
          errors={password.error}
        />

        <Btn color="purple" type="submit">
          Cadastrar
        </Btn>
      </Form>
    </>
  );
}
