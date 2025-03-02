import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: string;
}

export function Button({ children, onClick, variant = "default" }: ButtonProps) {
  return (
    <button className={`px-4 py-2 rounded ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}