import { ButtonHTMLAttributes, ReactNode } from "react";
import { StyledBtn } from "./style";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: string;
  size?: string;
}

export default function Btn({ children, size, color, ...rest }: BtnProps) {
  return (
    <StyledBtn size={size} color={color} {...rest}>
      {children}
    </StyledBtn>
  );
}
