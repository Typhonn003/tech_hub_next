import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const SmallButton = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="h-8 rounded-md border border-primary-violet6 bg-primary-violet3 px-5 text-sm font-medium no-underline transition-colors hover:bg-primary-violet4"
      {...rest}
    >
      {children}
    </button>
  );
};
