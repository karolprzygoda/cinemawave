"use client";

import Logo from "@/components/logo";
import AccountMenu from "@/components/account-menu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useScrolled } from "@/hooks/use-scrolled";

export const NAVBAR_LINKS = [
  { href: "#", label: "Home page" },
  { href: "#", label: "Series" },
  { href: "#", label: "Movies" },
  { href: "#", label: "New and popular" },
  { href: "#", label: "My List" },
];

const Header = () => {
  const scrolled = useScrolled();

  return (
    <header
      style={{ backgroundImage: "linear-gradient(180deg, rgba(0, 0, 0, 0.7) 10%, transparent)" }}
      className={cn(
        "sticky top-0 z-[999] flex h-[68px] w-full items-center justify-between px-[4%] duration-400 2xl:px-[60px]",
        scrolled ? "bg-background" : "bg-transparent",
      )}
    >
      <div className={"flex items-center gap-8"}>
        <Logo className={"w-32"} />
        <nav className={"hidden gap-7 text-sm text-nowrap xl:flex"}>
          {NAVBAR_LINKS.map((item, index) => (
            <Link
              href={item.href}
              className={buttonVariants({ variant: "linkGlow", size: "auto" })}
              key={item.href + "-" + index}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <AccountMenu />
    </header>
  );
};

export default Header;
