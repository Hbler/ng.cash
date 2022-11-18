import { errorToast } from "../components/toasts";

import API from "../services/API";
import Account from "./Account";

class User {
  id?: string;
  username: string;
  account: Account;

  constructor(username: string, account: Account, id?: string) {
    this.id = id;
    this.username = username;
    this.account = account;
  }

  updateAccount() {
    const auth = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("@ngcash:token")}`,
      },
    };

    API.get("/accounts", auth)
      .then((res) => (this.account.balance = res.data?.balance))
      .catch((err) => {
        console.log(err);
        errorToast(err.message);
      });
  }
}

export default User;
