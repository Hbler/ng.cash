import { ReactNode } from "react";

import AppTheme from "../styles/theme";
import TransactionProvider from "./trasactionProvider";
import UserProvider from "./userProvider";

type RootProviderProps = { children: ReactNode };

export default function RootProvider({ children }: RootProviderProps) {
  return (
    <AppTheme>
      <TransactionProvider>
        <UserProvider>{children}</UserProvider>
      </TransactionProvider>
    </AppTheme>
  );
}
