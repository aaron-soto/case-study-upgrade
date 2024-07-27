"use client";

import { ButtonVariant, buttonVariants } from "@/components/ui/button";

import Link from "next/link";
import { Oswald } from "next/font/google";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";

const oswald = Oswald({ subsets: ["latin"] });

export interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NavLink = ({
  href,
  children,
  className,
  setIsOpen,
}: NavLinkProps) => {
  const currentPath = usePathname();

  return (
    <Link
      target="_self"
      className={cn(
        buttonVariants({
          variant: "link",
        }),
        href && currentPath === href && "text-orange-400",
        oswald.className,
        className,
        "uppercase tracking-widest text-2xl md:text-sm"
      )}
      onClick={() => setIsOpen && setIsOpen(false)}
      href={href}
    >
      <div className="mt-1 flex items-center gap-4">{children}</div>
    </Link>
  );
};

export interface NavButtonProps {
  text: string;
  href: string;
  style: ButtonVariant;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  target?: string;
}

export const NavButton = ({
  text,
  href,
  style,
  setIsOpen,
  className,
  target,
}: NavButtonProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <Link
      href={href}
      target={target ? target : "_self"}
      className={buttonVariants({
        variant: style,
        size: isMobile ? "lg" : "xs",
        className: cn(
          "uppercase tracking-widest font-normal",
          oswald.className,
          className
        ),
      })}
      onClick={() => setIsOpen && setIsOpen(false)}
    >
      {text}
    </Link>
  );
};
