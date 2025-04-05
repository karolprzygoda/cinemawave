import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

const FOOTER_NAV_ITEMS = [
  {
    href: "/faq",
    label: "Frequently Asked Questions",
  },
  {
    href: "/faq",
    label: "Terms of Use",
  },
  {
    href: "/faq",
    label: "Help Center",
  },
  {
    href: "/faq",
    label: "Company Information",
  },
  {
    href: "/faq",
    label: "Cookie Settings",
  },
  {
    href: "/faq",
    label: "Ad Settings",
  },
  {
    href: "/faq",
    label: "Privacy",
  },
];
const PERSONAL_NAV_ITEMS = [
  { href: "https://github.com/karolprzygoda", Icon: FaGithub },
  { href: "https://www.linkedin.com/in/karol-przygoda/", Icon: FaLinkedin },
  { href: "https://x.com/JohnsonWeedrow", Icon: FaSquareXTwitter },
];

const Footer = () => {
  return (
    <footer
      className={cn(
        "bg-background border-border-muted text-muted-foreground flex w-full flex-col border-t py-12 lg:border-0",
      )}
    >
      <nav className={"flex w-full max-w-[90%] flex-col gap-8 self-center lg:max-w-[80%]"}>
        <div className={"flex flex-wrap"}>
          <span>Questions? Send a message to the email address:&nbsp;</span>
          <Link
            className={"hover:text-accent hover:underline"}
            href="mailto:karolprzygodakontakt@gmail.com"
          >
            karolprzygodakontakt@gmail.com
          </Link>
        </div>
        <FooterNavList listItem={FOOTER_NAV_ITEMS} />
        <PersonalNavList listItem={PERSONAL_NAV_ITEMS} />
      </nav>
    </footer>
  );
};

type FooterNavListProps = {
  listItem: {
    href: string;
    label: string;
  }[];
};

const FooterNavList = ({ listItem }: FooterNavListProps) => {
  return (
    <ul className={"flex flex-wrap justify-between gap-y-5 text-sm lg:justify-start"}>
      {listItem.map((item, index) => (
        <li
          className={"basis-[calc(50%-0.75rem)] lg:basis-[calc(25%-0.75rem)]"}
          key={item.label + "-" + index}
        >
          <Link href={item.href} className={"hover:text-accent underline"}>
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

type PersonalNavListProps = {
  listItem: {
    href: string;
    Icon: IconType;
  }[];
};

const PersonalNavList = ({ listItem }: PersonalNavListProps) => {
  return (
    <div className={"flex flex-wrap items-center gap-5"}>
      <span>&copy; All rights reserved Karol Przygoda</span>
      <ul className={"flex gap-3"}>
        {listItem.map((item, index) => (
          <li key={item.href + "-" + index}>
            <Link
              href={item.href}
              target={"_blank"}
              aria-label={item.Icon.name}
              className={"hover:text-accent text-xl"}
            >
              <item.Icon />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
