import { MdPersonAdd, MdPersonRemove } from "react-icons/md";
import Transaction from "../../models/Transaction";
import { ContextUser } from "../../providers/userProvider";
import { SCard } from "./style";

interface Props {
  transaction: Transaction;
}

export default function TransactionCard({ transaction }: Props) {
  const { user } = ContextUser();

  const date = new Date(transaction.createdAt);
  const isCashIn = user.account.id === transaction.creditedAccount?.id;

  return (
    <SCard>
      {isCashIn ? <MdPersonAdd /> : <MdPersonRemove />}
      <h4>
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(transaction.value)}
      </h4>
      <small>
        {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
      </small>
    </SCard>
  );
}
