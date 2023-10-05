import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="bg-black/20 backdrop-blur-sm fixed top-0 left-0 w-full min-h-screen flex justify-center items-center">
      <div className="w-[90vw] sm:max-w-4xl flex justify-center">
        {children}
      </div>
    </div>
  );
};
