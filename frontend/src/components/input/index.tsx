import { InputHTMLAttributes } from "react";
import { InputContainer } from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  field: any;
  placeholder: string;
  label?: string;
  errors?: any;
}

export default function Input({
  name,
  placeholder,
  label,
  errors,
  field,
  ...rest
}: InputProps) {
  return (
    <InputContainer>
      {!!label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        placeholder={placeholder}
        {...rest}
        {...field.inputProps}
      />
      {!!errors && <small>{errors}</small>}
    </InputContainer>
  );
}
