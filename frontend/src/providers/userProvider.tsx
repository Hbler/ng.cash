import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { errorToast, successToast } from "../components/toasts";
import User from "../models/User";
import API from "../services/API";

type UserProviderProps = { children: ReactNode };

interface newUser {
  username: string;
  password: string;
}

interface UserProviderData {
  token: string;
  user: User;
  setUser: Dispatch<SetStateAction<User>>;

  login: (
    username: string,
    password: string,
    callback: (route: string) => void
  ) => void;
  logOut: (callback: (route: string) => void) => void;
  signUp: (newUser: newUser, callback: (route: string) => void) => void;
}

export const UserContext = createContext<UserProviderData>(
  {} as UserProviderData
);

export const ContextUser = () => {
  const context = useContext(UserContext);
  return context;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({} as User);

  const login = (
    username: string,
    password: string,
    callback: (route: string) => void
  ) => {
    API.post("login", { username, password })
      .then((res) => {
        setToken(res.data.token);
        localStorage.setItem("@ngcash:token", res.data.token);

        let currentUser: User;

        const auth = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("@ngcash:token")}`,
          },
        };

        API.get("/users", auth)
          .then((res) => {
            currentUser = new User(res.data.username, res.data.account);
            localStorage.setItem("@ngcash:user", JSON.stringify(currentUser));
            setUser(currentUser);
          })
          .catch((err: unknown) => console.log(err));

        setTimeout(() => {
          localStorage.removeItem("@ngcash:token");
          localStorage.removeItem("@ngcash:user");
          setToken("");
        }, 86400);

        successToast("Login realizado!");
        callback("/main");
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.message);
      });
  };

  const logOut = (callback: (route: string) => void) => {
    localStorage.removeItem("@ngcash:token");
    localStorage.removeItem("@ngcash:user");
    setToken("");
    callback("/");
  };

  const signUp = (newUser: newUser, callback: (route: string) => void) => {
    API.post("/users", newUser)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        errorToast(err.message);
      });
  };

  const checkLocalUser = (savedUser: string) => {
    if (savedUser) {
      const currentUser = JSON.parse(savedUser);
      const userInstance = new User(currentUser.username, currentUser.account);

      setUser(userInstance);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("@ngcash:token") || "";
    const savedUser = localStorage.getItem("@ngcash:user") || "";

    if (savedToken) {
      //parse jwt
      const decode = JSON.parse(atob(savedToken.split(".")[1]));

      // verify token expiration
      if (!(decode.exp * 1000 < new Date().getTime())) {
        user.updateAccount();
      } else {
        localStorage.clear();
        errorToast("Sua sessão expirou...");
      }
    }

    if (savedUser && Object.keys(user).length === 0) checkLocalUser(savedUser);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        setUser,
        login,
        logOut,
        signUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
