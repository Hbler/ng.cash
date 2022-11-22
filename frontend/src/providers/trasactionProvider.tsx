import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { errorToast } from "../components/toasts";
import Transaction from "../models/Transaction";
import API from "../services/API";

type TransactionProviderProps = { children: ReactNode };

interface TransactionProviderData {
  getTransactionsByDate: (date: string) => void;
  getTransactions: () => void;
  getCashOuts: () => void;
  getCashIns: () => void;
  filtered: Transaction[];
  setTransactionsList: Dispatch<React.SetStateAction<Transaction[]>>;
}

export const TransactionContext = createContext<TransactionProviderData>(
  {} as TransactionProviderData
);

export const ContextTransaction = () => {
  const context = useContext(TransactionContext);
  return context;
};

export default function TransactionProvider({
  children,
}: TransactionProviderProps) {
  const [transactionsList, setTransactionsList] = useState([] as Transaction[]);
  const [filtered, setFiltered] = useState([...transactionsList]);

  const getTransactionsByDate = (date: string) => {
    const token = localStorage.getItem("@ngcash:token") || "";

    if (token) {
      const auth = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      API.get(`/transactions/${date}`, auth)
        .then((res) => {
          if (res.data.length === 0) errorToast("Sem transações nessa data");
          setTransactionsList([...res.data]);
        })
        .catch((err) => console.log(err.response?.data.message));
    }
  };

  const getTransactions = () => {
    const token = localStorage.getItem("@ngcash:token") || "";

    if (token) {
      const auth = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      API.get("/transactions", auth)
        .then((res) => {
          setTransactionsList([...res.data]);
        })
        .catch((err) => console.log(err.response?.data.message));
    }
  };

  const getCashOuts = () => {
    const token = localStorage.getItem("@ngcash:token") || "";

    if (token) {
      const auth = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      API.get("/transactions/cashouts", auth)
        .then((res) => {
          if (res.data.length === 0) errorToast("Você ainda não tem Cash-Outs");
          setTransactionsList([...res.data]);
        })
        .catch((err) => console.log(err.response?.data.message));
    }
  };

  const getCashIns = () => {
    const token = localStorage.getItem("@ngcash:token") || "";

    if (token) {
      const auth = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      API.get("/transactions/cashins", auth)
        .then((res) => {
          if (res.data.length === 0) errorToast("Você ainda não tem Cash-Ins");
          setTransactionsList([...res.data]);
        })
        .catch((err) => console.log(err.response?.data.message));
    }
  };

  useEffect(() => {
    if (transactionsList.length === 0) {
      getTransactions();
    }

    setFiltered([...transactionsList]);
  }, [transactionsList]);

  return (
    <TransactionContext.Provider
      value={{
        getTransactionsByDate,
        getTransactions,
        getCashOuts,
        getCashIns,
        filtered,
        setTransactionsList,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
