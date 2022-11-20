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
  signUp: (newUser: newUser, callback: () => void) => void;
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
    API.post("/login", { username, password })
      .then(async (res) => {
        setToken(res.data.token);
        localStorage.setItem("@ngcash:token", res.data.token);

        const auth = {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        };

        try {
          const userData = await API.get("/users", auth);

          const aUser = new User(
            userData.data.username,
            userData.data.account,
            userData.data.id
          );

          setUser(aUser);
          localStorage.setItem("@ngcash:user", JSON.stringify(aUser));

          setTimeout(() => {
            localStorage.removeItem("@ngcash:token");
            localStorage.removeItem("@ngcash:user");
            setToken("");
          }, 8.64e7);

          successToast("Login realizado!");
          callback("/main");
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.response.data.message);
      });
  };

  const logOut = (callback: (route: string) => void) => {
    localStorage.removeItem("@ngcash:token");
    localStorage.removeItem("@ngcash:user");
    setToken("");
    callback("/");
  };

  const signUp = (newUser: newUser, callback: () => void) => {
    API.post("/users", newUser)
      .then((_) => {
        successToast("Cadastro realizado!");
      })
      .catch((err) => {
        console.log(err);
        errorToast(err.response.data.message);
      });

    callback();
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
      if (!(decode.exp * 1000 < new Date().getTime()) && savedUser) {
        const currentUser = JSON.parse(savedUser);
        const userInstance = new User(
          currentUser.username,
          currentUser.account
        );
        userInstance.updateAccount();
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
