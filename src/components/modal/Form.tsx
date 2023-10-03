import { FormHTMLAttributes, ReactNode } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

export const Form = ({ children, ...rest }: FormProps) => {
  return (
    <form
      className="box-border flex flex-col gap-6 w-full max-w-sm bg-grey400 px-6 py-8 rounded-md mb-8"
      {...rest}
    >
      {children}
    </form>
  );
};
