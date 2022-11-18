class Account {
  id?: string;
  balance: number;

  constructor(balance: number, id?: string) {
    this.id = id;
    this.balance = balance;
  }
}

export default Account;
