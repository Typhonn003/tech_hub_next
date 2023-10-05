import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const SmallButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="text-white bg-grey400 font-medium text-sm no-underline h-8 px-5 rounded-md border-none hover:bg-grey300 transition-colors"
      {...rest}
    >
      {children}
    </button>
  );
};
