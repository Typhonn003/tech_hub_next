import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const LargeButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="mt-auto h-10 rounded-md bg-secondary-crimson9 px-5 text-sm font-medium text-secondary-crimson12 transition-colors hover:bg-secondary-crimson10 disabled:cursor-not-allowed"
      {...rest}
    >
      {children}
    </button>
  );
};
