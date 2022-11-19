import { Navigate, Route, Routes as Switch } from "react-router-dom";

import LoginPage from "../pages/login";
import MainPage from "../pages/main";

import { ContextUser } from "../providers/userProvider";

export default function Routes() {
  const { token } = ContextUser();
  return (
    <Switch>
      <Route
        index
        element={!!token ? <Navigate to={"/main"} /> : <LoginPage />}
      />

      <Route
        path="/main"
        element={!!token ? <MainPage /> : <Navigate to={"/"} />}
      />
    </Switch>
  );
}
