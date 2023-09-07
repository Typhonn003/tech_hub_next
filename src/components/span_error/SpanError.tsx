import { ReactNode } from "react";

interface ErrorProps {
  children: ReactNode;
}

export const SpanError = ({ children }: ErrorProps) => {
  return (
    <span className="absolute -bottom-4 right-0 text-pink100 font-medium text-xs">
      {children}
    </span>
  );
};
