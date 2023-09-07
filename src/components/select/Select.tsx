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
    <fieldset className="flex flex-col gap-2 relative">
      <label className="text-xs font-normal" htmlFor={id}>{label}</label>
      <select
        className="box-border h-10 w-full bg-grey300 text-grey100 text-sm font-normal rounded-md border-2 border-grey300 px-4 outline-none placeholder:text-grey200 focus:border-grey100 cursor-not-allowed"
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
