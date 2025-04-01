import Logo from "@/components/logo";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";
import AccountMenu from "@/components/account-menu";

const NAVBAR_LINKS = [
  { href: "#", label: "Home page" },
  { href: "#", label: "Series" },
  { href: "#", label: "Movies" },
  { href: "#", label: "New and popular" },
  { href: "#", label: "My List" },
];

const Header = () => {
  return (
    <header
      className={
        "sticky top-0 z-30 flex h-20 w-full items-center justify-between bg-gradient-to-b from-[rgba(0,0,0,0.7)] from-10% to-transparent px-4 py-6 duration-500 md:px-16"
      }
    >
      <div className={"flex items-center gap-8"}>
        <Logo height={14} width={130} />
        <nav className={"hidden gap-7 text-nowrap xl:flex"}>
          {NAVBAR_LINKS.map((item, index) => (
            <NavbarLink
              key={item.href + "-" + index}
              href={item.href}
              label={item.label}
            />
          ))}
        </nav>
      </div>
      <AccountMenu />
    </header>
  );
};

type NavbarLinkProps = {
  label: string;
  className?: string;
} & Omit<LinkProps, "children">;

const NavbarLink = ({ label, className, ...props }: NavbarLinkProps) => {
  return (
    <Link
      className={cn(
        `font-semibold text-white/80 transition hover:text-white/55`,
        className,
      )}
      {...props}
    >
      {label}
    </Link>
  );
};

export default Header;
