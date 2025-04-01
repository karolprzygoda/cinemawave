import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IconType } from "react-icons";

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
      className={
        "flex w-full flex-col border-t border-white bg-black py-12 lg:border-0"
      }
    >
      <nav
        className={
          "flex w-full max-w-[90%] flex-col gap-8 self-center text-neutral-400 lg:max-w-[80%]"
        }
      >
        <div className={"flex flex-wrap"}>
          Questions? Send a message to the email address:&nbsp;
          <a
            href="mailto:karolprzygodastudia@gmail.com"
            className={"hover:text-white hover:underline"}
          >
            karolprzygodastudia@gmail.com
          </a>
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
    <ul
      className={
        "flex flex-wrap justify-between gap-y-5 text-sm lg:justify-start"
      }
    >
      {listItem.map((item, index) => (
        <li
          className={"basis-[calc(50%-0.75rem)] lg:basis-[calc(25%-0.75rem)]"}
          key={item.label + "-" + index}
        >
          <Link href={item.href} className={"underline hover:text-white"}>
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
      &copy; All rights reserved Karol Przygoda
      <ul className={"flex gap-3"}>
        {listItem.map((item, index) => (
          <li key={item.href + "-" + index}>
            <a
              href={item.href}
              target={"_blank"}
              className={"text-xl hover:text-white"}
            >
              <item.Icon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
