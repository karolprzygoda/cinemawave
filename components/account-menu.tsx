import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import SignOutButton from "@/components/sign-out-button";
import { FaCaretDown } from "react-icons/fa";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Offcanvas,
  OffcanvasContent,
  OffcanvasHeader,
  OffcanvasTrigger,
} from "@/components/ui/offcanvas";
import Avatar from "@/components/ui/avatar";
import { NAVBAR_LINKS } from "@/components/header";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { GoChevronRight } from "react-icons/go";
import { MdOutlineExitToApp } from "react-icons/md";

const ACCOUNT_MENU_LINKS = [
  { href: "#", label: "Account", Icon: AiOutlineUser },
  { href: "/faq", label: "Help center", Icon: IoIosHelpCircleOutline },
];

const AccountMenu = () => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  if (isDesktop) {
    return (
      <DropdownMenu variant={"onHover"}>
        <DropdownMenuTrigger>
          <AccountMenuTrigger avatarSrc={"/images/default-blue.png"} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <SwitchProfileButton
              href={"#"}
              profileName={"Karol"}
              avatarSrc={"/images/default-blue.png"}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {ACCOUNT_MENU_LINKS.map((item, index) => (
            <DropdownMenuItem key={item.href + "-" + index}>
              <Link href={item.href} className={"flex items-center gap-2 hover:underline"}>
                <item.Icon className={"text-muted-foreground mx-1"} size={24} />
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutButton className={"w-full justify-center hover:underline"}>
              Sign out
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Offcanvas>
      <OffcanvasTrigger>
        <AccountMenuTrigger avatarSrc={"/images/default-blue.png"} />
      </OffcanvasTrigger>
      <OffcanvasContent>
        <OffcanvasHeader>
          <SwitchProfileButton
            href={"#"}
            profileName={"Karol"}
            avatarSrc={"/images/default-blue.png"}
          />
        </OffcanvasHeader>
        <nav className={"divide-border-muted flex flex-col divide-y text-nowrap first:border-0"}>
          <NavList navList={NAVBAR_LINKS.map((item) => ({ ...item, Icon: GoChevronRight }))} />
          <NavList navList={ACCOUNT_MENU_LINKS} />
        </nav>
        <SignOutButton
          className={"hover:bg-muted flex w-full items-center justify-between px-4 py-3"}
        >
          Sign Out <MdOutlineExitToApp size={20} />
        </SignOutButton>
      </OffcanvasContent>
    </Offcanvas>
  );
};

type AccountMenuTriggerProps = {
  avatarSrc: string;
};

const AccountMenuTrigger = ({ avatarSrc }: AccountMenuTriggerProps) => {
  return (
    <div className={"flex items-center gap-2"}>
      <Avatar src={avatarSrc} />
      <FaCaretDown
        className={`hidden rotate-0 transition duration-300 group-aria-expanded/dropdown-trigger:rotate-180 lg:block`}
      />
    </div>
  );
};

type NavListProps = {
  navList: { label: string; href: string; Icon: IconType }[];
};

const NavList = ({ navList }: NavListProps) => {
  return (
    <ul className={"flex flex-col"}>
      {navList.map((item, index) => (
        <li
          className={"hover:bg-muted cursor-pointer px-4 py-3 transition"}
          key={item.href + "-" + index}
        >
          <Link className={"flex items-center justify-between"} href={item.href}>
            {item.label}
            <item.Icon size={20} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

type SwitchProfileButtonProps = {
  href: string;
  profileName: string;
  avatarSrc: string;
  className?: string;
};

const SwitchProfileButton = ({
  href,
  profileName,
  avatarSrc,
  className,
}: SwitchProfileButtonProps) => {
  return (
    <Link href={href} className={cn("group/profile relative flex items-center gap-4", className)}>
      <Avatar src={avatarSrc} />
      <div className={"flex flex-col"}>
        <span className={"text-lg"}>{profileName}</span>
        <span className={"text-secondary text-sm group-hover/profile:underline"}>
          Switch Profiles
        </span>
      </div>
    </Link>
  );
};

export default AccountMenu;
