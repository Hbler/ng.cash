import { Navigate, Route, Routes as Switch } from "react-router-dom";

import LoginPage from "../pages/login";
import MainPage from "../pages/main";
import { ContextUser } from "../providers/userProvider";

export default function Routes() {
  const { token } = ContextUser();

  const aToken = token || localStorage.getItem("@ngcash:token");

  return (
    <Switch>
      <Route
        index
        element={!!aToken ? <Navigate to={"/main"} /> : <LoginPage />}
      />
      <Route
        path="/main"
        element={!!aToken ? <MainPage /> : <Navigate to={"/"} />}
      />
    </Switch>
  );
}
