import { ReactNode, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  register?: object;
  error?: ReactNode;
}

export const TextArea = ({
  id,
  label,
  register,
  error,
  ...rest
}: TextAreaProps) => {
  return (
    <fieldset className="relative flex flex-col gap-2">
      <label className="text-xs font-normal" htmlFor={id}>
        {label}
      </label>
      <textarea
        className="box-border h-32 py-2 w-full resize-none rounded-md border border-primary-violet6 bg-primary-violet4 px-4 text-sm font-normal text-primary-violet12 placeholder:text-primary-violet11"
        id={id}
        {...register}
        {...rest}
      />
      {error}
    </fieldset>
  );
};
