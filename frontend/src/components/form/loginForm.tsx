import { useForm, useInput } from "lx-react-form";
import { useNavigate } from "react-router-dom";

import { ContextUser } from "../../providers/userProvider";

import Form from ".";
import Input from "../input";
import Btn from "../buttons";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = ContextUser();

  const username = useInput({
    name: "username",
    minLength: 3,
    errorText: { minLength: "O username deve ter 3 caracteres no mínimo" },
  });

  const password = useInput({
    name: "password",
    minLength: 8,
    errorText: {
      minLength: "O password deve ter 8 caracteres no mínimo",
    },
  });

  const loginForm = useForm({
    clearFields: true,
    formFields: [username, password],
    submitCallback: (loginData) => {
      const { username, password } = loginData;
      login(username, password, navigate);
    },
  });
  return (
    <>
      <h2>Login</h2>
      <Form callback={loginForm.handleSubmit}>
        <Input
          label="Username"
          placeholder="Digite seu username"
          type="text"
          name="username"
          field={username}
          errors={username.error}
        />

        <Input
          label="Password"
          placeholder="Digite seu password"
          type="password"
          name="password"
          field={password}
          errors={password.error}
        />

        <Btn color="purple" type="submit">
          Entrar
        </Btn>
      </Form>
    </>
  );
}
