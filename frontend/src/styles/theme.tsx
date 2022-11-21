import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./global";

type PalletMode = keyof typeof palletes;

interface ThemeProviderData {
  currentTheme: PalletMode;
  setCurrentTheme: Dispatch<SetStateAction<"light" | "dark">>;
  getOppositTheme: () => PalletMode;
}

interface Props {
  children: ReactNode;
}

export type Theme = {
  primary: string;
  primaryA70: string;
  primaryA50: string;
  primaryA30: string;
  secondary: string;
  secondaryA70: string;
  secondaryA50: string;
  secondaryA30: string;
  supportA: string;
  supportB: string;
  accent: string;
  highlight: string;
  success: string;
  info: string;
  error: string;
  warning: string;
};

const lightPallete: Theme = {
  primary: "#fff",
  primaryA70: "#fff7",
  primaryA50: "#fff5",
  primaryA30: "#fff3",
  secondary: "#000",
  secondaryA70: "#0007",
  secondaryA50: "#0005",
  secondaryA30: "#0003",
  supportA: "#c5c5c5",
  supportB: "#bfbfbf",
  accent: "#ff00ff",
  highlight: "#7431f4",
  success: "#01ca30",
  info: "#00d6ff",
  error: "#ff0000",
  warning: "#fbec00",
};

const darkPallete: Theme = {
  primary: "#000",
  primaryA70: "#0007",
  primaryA50: "#0005",
  primaryA30: "#0003",
  secondary: "#fff",
  secondaryA70: "#fff7",
  secondaryA50: "#fff5",
  secondaryA30: "#fff3",
  supportA: "#bfbfbf",
  supportB: "#c5c5c5",
  accent: "#ff00ff",
  highlight: "#7431f4",
  success: "#01ca30",
  info: "#00d6ff",
  error: "#ff0000",
  warning: "#fbec00",
};

export const palletes = {
  light: lightPallete,
  dark: darkPallete,
};

export const ThemeContext = createContext({} as ThemeProviderData);

export default function AppTheme({ children }: Props) {
  const [currentTheme, setCurrentTheme] = useState<PalletMode>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("@ngcash:palleteMode") || "light";
    setCurrentTheme(savedTheme as PalletMode);
  }, []);

  const getOppositTheme = useCallback(() => {
    if (currentTheme === "light") {
      localStorage.setItem("@ngcash:palleteMode", "dark");
      return "dark" as PalletMode;
    } else {
      localStorage.setItem("@ngcash:palleteMode", "light");
      return "light" as PalletMode;
    }
  }, [currentTheme]);

  return (
    <ThemeProvider theme={palletes[currentTheme]}>
      <ThemeContext.Provider
        value={{ currentTheme, setCurrentTheme, getOppositTheme }}
      >
        <GlobalStyle />
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}
