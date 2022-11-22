import { useEffect, useState } from "react";
import Btn from "../../components/buttons";
import CashOutForm from "../../components/form/cashOutForm";
import TransactionCard from "../../components/transactionCard";
import { LogOut, ThemeChange } from "../../components/ui-icons";
import { ContextTransaction } from "../../providers/trasactionProvider";

import { ContextUser } from "../../providers/userProvider";

import { SMain } from "./style";

export default function MainPage() {
  const { user } = ContextUser();
  const {
    filtered,
    getTransactions,
    getCashIns,
    getCashOuts,
    getTransactionsByDate,
  } = ContextTransaction();

  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (user.username) {
      setLoading(false);
    }

    if (filtered.length === 0) {
      getTransactions();
    }
  }, [user, filtered, getTransactions]);

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
            <div>
              <p>
                Olá <span>{user.username}</span> confira suas
              </p>
              <h2>Transações</h2>
              <ul className="transactions">
                {filtered.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </ul>
              <div className="filters">
                <Btn
                  size="sm"
                  onClick={() => {
                    getTransactions();
                  }}
                >
                  Todas
                </Btn>
                <Btn
                  size="sm"
                  onClick={() => {
                    getCashIns();
                  }}
                >
                  Cash-Ins
                </Btn>
                <Btn
                  size="sm"
                  onClick={() => {
                    getCashOuts();
                  }}
                >
                  Cash-Outs
                </Btn>
              </div>
              <form
                className="filter_date"
                onSubmit={(e) => {
                  e.preventDefault();

                  getTransactionsByDate(date);
                }}
              >
                <input
                  type="date"
                  name="date"
                  id="date"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
                <Btn size="sm" type="submit">
                  Filtrar
                </Btn>
              </form>
            </div>
          </div>
        </>
      )}
    </SMain>
  );
}
