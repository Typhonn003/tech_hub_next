import Link from "next/link";
import { ReactNode } from "react";

interface LinkProps {
  href: string;
  children: ReactNode;
}

export const LinkMedium = ({ href, children }: LinkProps) => {
  return (
    <Link
      className="inline-flex h-8 items-center justify-center rounded-md border border-primary-violet6 bg-primary-violet3 px-5 text-sm font-medium no-underline transition-colors hover:bg-primary-violet4"
      href={href}
    >
      {children}
    </Link>
  );
};
