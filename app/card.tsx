import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return <div className="p-4 border rounded-lg shadow">{children}</div>;
}

export function CardContent({ children }: CardProps) {
  return <div className="p-2">{children}</div>;
}