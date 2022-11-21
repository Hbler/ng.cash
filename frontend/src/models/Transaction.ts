import Account from "./Account";

class Transaction {
  id?: string;
  value: number;
  createdAt: Date;
  debitedAccount?: Account;
  creditedAccount?: Account;

  constructor(
    value: number,
    createdAt: Date,
    id?: string,
    debitedAccount?: Account,
    creditedAccount?: Account
  ) {
    this.id = id;
    this.value = value;
    this.createdAt = createdAt;
    this.debitedAccount = debitedAccount;
    this.creditedAccount = creditedAccount;
  }
}

export default Transaction;
