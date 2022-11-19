import { FormHTMLAttributes, ReactNode, SyntheticEvent } from "react";
import { SForm } from "./style";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
  callback: (event: SyntheticEvent<Element, Event>) => void;
}

export default function Form({ children, callback, ...rest }: FormProps) {
  return (
    <SForm
      onSubmit={(e) => {
        callback(e);
      }}
      {...rest}
    >
      {children}
    </SForm>
  );
}
