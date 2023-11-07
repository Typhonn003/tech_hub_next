import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="fixed left-0 top-0 flex min-h-screen w-full items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="flex w-[90vw] justify-center sm:max-w-4xl">
        {children}
      </div>
    </div>
  );
};
