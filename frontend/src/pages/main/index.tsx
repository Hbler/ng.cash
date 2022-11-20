import { useEffect, useState } from "react";
import CashOutForm from "../../components/form/cashOutForm";
import { LogOut, ThemeChange } from "../../components/ui-icons";

import { ContextUser } from "../../providers/userProvider";

import { SMain } from "./style";

export default function MainPage() {
  const { user } = ContextUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.username) {
      setLoading(false);
    }
  }, [user]);

  return (
    <SMain>
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <>
          <div className="container">
            <div>
              <ThemeChange />
              <LogOut />
              <h2>Saldo</h2>
              <h3>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(user.account.balance)}
              </h3>
              <CashOutForm />
            </div>
            <div></div>
          </div>
        </>
      )}
    </SMain>
  );
}
