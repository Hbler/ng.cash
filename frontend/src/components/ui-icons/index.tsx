import { useContext } from "react";

import { MdDarkMode, MdLightMode, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ContextUser } from "../../providers/userProvider";

import { ThemeContext } from "../../styles/theme";

export const ThemeChange = () => {
  const { currentTheme, setCurrentTheme, getOppositTheme } =
    useContext(ThemeContext);

  const changeTheme = () => {
    setCurrentTheme(getOppositTheme());
  };

  return (
    <>
      {currentTheme === "light" ? (
        <MdLightMode onClick={changeTheme} />
      ) : (
        <MdDarkMode onClick={changeTheme} />
      )}
    </>
  );
};

export const LogOut = () => {
  const { logOut } = ContextUser();
  const navigate = useNavigate();

  return (
    <MdLogout
      onClick={() => {
        logOut(navigate);
      }}
    />
  );
};
