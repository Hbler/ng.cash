import { ReactNode } from "react";

import AppTheme from "../styles/theme";
import UserProvider from "./userProvider";

type RootProviderProps = { children: ReactNode };

export default function RootProvider({ children }: RootProviderProps) {
  return (
    <AppTheme>
      <UserProvider>{children}</UserProvider>
    </AppTheme>
  );
}
