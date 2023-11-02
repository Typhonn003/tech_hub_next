import { SelectHTMLAttributes, ReactNode } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  children: ReactNode;
  register?: object;
  error?: ReactNode;
}

export const Select = ({
  id,
  label,
  children,
  register,
  error,
  ...rest
}: SelectProps) => {
  return (
    <fieldset className="relative flex flex-col gap-2">
      <label className="text-xs font-normal" htmlFor={id}>
        {label}
      </label>
      <select
        className="box-border h-10 w-full bg-primary-violet4 rounded-md border border-primary-violet6 px-4 text-sm font-normal text-primary-violet12 placeholder:text-primary-violet12 disabled:cursor-not-allowed"
        id={id}
        {...register}
        {...rest}
      >
        {children}
      </select>
      {error}
    </fieldset>
  );
};
