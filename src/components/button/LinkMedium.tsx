import Link from "next/link";
import { ReactNode } from "react";

interface LinkProps {
  href: string;
  children: ReactNode;
}

export const LinkMedium = ({ href, children }: LinkProps) => {
  return (
    <Link
      className="text-white inline-flex items-center justify-center bg-grey400 font-medium text-sm no-underline h-8 px-5 rounded-md border-none hover:bg-grey300 transition-colors"
      href={href}
    >
      {children}
    </Link>
  );
};
