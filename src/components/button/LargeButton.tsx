import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const LargeButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="bg-pink100 text-white font-medium text-base h-10 px-5 rounded-md border-none transition-colors hover:bg-pink200 disabled:bg-pink50"
      {...rest}
    >
      {children}
    </button>
  );
};
