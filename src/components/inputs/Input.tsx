import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type: "text" | "password" | "email";
  register?: object;
  error?: ReactNode;
}

export const Input = ({
  id,
  label,
  type,
  register,
  error,
  ...rest
}: InputProps) => {
  return (
    <fieldset className="relative flex flex-col gap-2">
      <label className="text-xs font-normal" htmlFor={id}>
        {label}
      </label>
      <input
        className="box-border h-10 w-full rounded-md border border-primary-violet6 bg-primary-violet4 px-4 text-sm font-normal text-primary-violet12 placeholder:text-primary-violet11 disabled:cursor-not-allowed"
        type={type}
        id={id}
        {...register}
        {...rest}
      />
      {error}
    </fieldset>
  );
};
