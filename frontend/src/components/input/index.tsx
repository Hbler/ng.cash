import { InputHTMLAttributes } from "react";
import { InputContainer } from "./style";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  register: any;
  placeholder: string;
  label?: string;
  errors?: any;
}

export default function Input({
  name,
  placeholder,
  label,
  register,
  errors,
  ...rest
}: InputProps) {
  return (
    <InputContainer>
      {!!label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        placeholder={placeholder}
        {...register(name)}
        {...rest}
      />
      {!!errors && <small>{errors}</small>}
    </InputContainer>
  );
}
