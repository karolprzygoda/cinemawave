"use client";

import Logo from "@/components/logo";
import AccountMenu from "@/components/account-menu";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import useScroll from "@/hooks/use-scroll";
import useScrollRestoration from "@/hooks/use-scroll-restoration";

export const NAVBAR_LINKS = [
  { href: "#", label: "Home page" },
  { href: "#", label: "Series" },
  { href: "#", label: "Movies" },
  { href: "#", label: "New and popular" },
  { href: "#", label: "My List" },
];

const Header = () => {
  const { y } = useScroll();
  useScrollRestoration();

  return (
    <header
      className={cn(
        "sticky top-0 z-[999] flex h-18 w-full items-center justify-between px-4 py-6 duration-400 before:absolute before:inset-0 before:z-[-1] before:bg-gradient-to-b before:from-[rgba(0,0,0,0.7)] before:from-10% before:to-transparent before:transition-opacity before:duration-400 before:content-[''] md:px-16",
        y > 20 ? "bg-background before:opacity-0" : "before:opacity-100",
      )}
    >
      <div className={"flex items-center gap-8"}>
        <Logo height={14} width={130} />
        <nav className={"hidden gap-7 text-nowrap xl:flex"}>
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
