import { FormHTMLAttributes, ReactNode } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const Form = ({ children, ...rest }: FormProps) => {
  return (
    <form
      className="mb-8 box-border flex w-full max-w-sm flex-col gap-6 rounded-md border border-primary-violet6 bg-gradient-to-bl from-primary-violet2 to-primary-violet3 px-6 py-8"
      {...rest}
    >
      {children}
    </form>
  );
};
