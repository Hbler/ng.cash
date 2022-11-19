import { useState } from "react";

import { SMain } from "./style";

import LoginForm from "../../components/form/loginForm";
import SignUpForm from "../../components/form/signupForm";
import Btn from "../../components/buttons";

export default function LoginPage() {
  const [willSignUp, setWillSignUp] = useState(true);

  const invertState = () => {
    setWillSignUp(!willSignUp);
  };

  return (
    <SMain>
      <div className="container">
        <div>
          <h1>NG.CA$H</h1>
          <h2>A Carteira da Nova Geração.</h2>
          <h3>É pra todas as idades!</h3>
        </div>
        <div>
          {willSignUp ? <SignUpForm callback={invertState} /> : <LoginForm />}
          {willSignUp ? (
            <>
              <small>Já tem uma conta?</small>
              <Btn size="sm" onClick={invertState}>
                Fazer Login
              </Btn>
            </>
          ) : (
            <>
              <small>Ainda não tem uma conta?</small>
              <Btn size="sm" onClick={invertState}>
                Cadastrar
              </Btn>
            </>
          )}
        </div>
      </div>
    </SMain>
  );
}
