"use client";
import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="p-2 border rounded-lg w-full" />;
}