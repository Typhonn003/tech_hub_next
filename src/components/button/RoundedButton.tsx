import { ButtonHTMLAttributes, ReactNode } from "react";

interface RoundedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const RoundedButton = ({ children, ...rest }: RoundedButtonProps) => {
  return (
    <button
      className="flex h-8 w-8 items-center justify-center rounded-full border border-primary-violet6 bg-primary-violet3 hover:bg-primary-violet4"
      {...rest}
    >
      {children}
    </button>
  );
};
