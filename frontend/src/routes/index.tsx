import { Navigate, Route, Routes as Switch } from "react-router-dom";

import LoginPage from "../pages/login";
import MainPage from "../pages/main";
import SignUpPage from "../pages/signup";

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
        path="/signup"
        element={!!token ? <Navigate to={"/main"} /> : <SignUpPage />}
      />
      <Route
        path="/main"
        element={!!token ? <MainPage /> : <Navigate to={"/"} />}
      />
    </Switch>
  );
}
