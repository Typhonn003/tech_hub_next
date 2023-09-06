import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type: "text" | "password" | "email" | "tel" | "number";
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
    <fieldset className="flex flex-col gap-2 relative">
      <label className="text-xs font-normal" htmlFor={id}>
        {label}
      </label>
      <input
        className="box-border h-10 w-full bg-grey300 text-grey100 text-sm font-normal rounded-md border-2 border-grey300 px-4 outline-none placeholder:text-grey200 focus:border-grey100"
        type={type}
        id={id}
        {...register}
        {...rest}
      />
      {error}
    </fieldset>
  );
};
