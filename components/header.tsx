"use client";

import Logo from "@/components/logo";
import AccountMenu from "@/components/account-menu";
import useScrolled from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

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
      className={cn(
        "sticky top-0 z-30 flex h-20 w-full items-center justify-between from-[rgba(0,0,0,0.7)] from-10% to-transparent px-4 py-6 duration-500 md:px-16",
        scrolled ? "bg-background" : "bg-gradient-to-b",
      )}
    >
      <div className={"flex items-center gap-8"}>
        <Logo height={14} width={130} />
        <nav className={"hidden gap-7 text-nowrap xl:flex"}>
          {NAVBAR_LINKS.map((item, index) => (
            <Link
              href={item.href}
              className={cn(
                buttonVariants({ variant: "linkGlow", size: "auto" }),
                "text-muted-foreground",
              )}
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
