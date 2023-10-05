import { ButtonHTMLAttributes, ReactNode } from "react";

interface RoundedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const RoundedButton = ({ children, ...rest }: RoundedButtonProps) => {
  return (
    <button
      className="h-8 w-8 rounded-full flex items-center justify-center bg-grey400 hover:bg-grey300"
      {...rest}
    >
      {children}
    </button>
  );
};
