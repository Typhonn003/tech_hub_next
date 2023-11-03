import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "purple" | "pink";
}

export const SmallButton = ({ children, color, ...rest }: ButtonProps) => {
  return (
    <button
      data-color={color}
      className="ml-auto flex h-8 items-center gap-2 rounded-md border border-primary-violet6 bg-primary-violet3 px-5 text-sm font-medium no-underline transition-colors hover:bg-primary-violet4 data-[color=pink]:border-none data-[color=pink]:bg-secondary-crimson9 data-[color=pink]:text-secondary-crimson12 data-[color=pink]:hover:bg-secondary-crimson10"
      {...rest}
    >
      {children}
    </button>
  );
};
