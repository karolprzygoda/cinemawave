import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";
import { PiPencilLight } from "react-icons/pi";
import { IconType } from "react-icons";
import SignOutButton from "@/components/sign-out-button";
import { FaCaretDown } from "react-icons/fa";

const ACCOUNT_MENU_LINKS = [
  { href: "#", label: "Manage profiles", Icon: PiPencilLight },
  { href: "#", label: "Account", Icon: AiOutlineUser },
  { href: "/faq", label: "Help center", Icon: IoIosHelpCircleOutline },
];

const AccountMenu = () => {
  return (
    <DropdownMenu variant={"onHover"}>
      <DropdownMenuTrigger className={"relative flex items-center gap-2"}>
        <Image
          width={24}
          height={24}
          className={"h-6 w-6 rounded-md lg:h-10 lg:w-10"}
          src="/images/default-blue.png"
          alt="profile"
        />
        <FaCaretDown
          className={`hidden rotate-0 text-white transition duration-300 group-hover:rotate-180 lg:block [@media(hover:hover)]:delay-300 [@media(hover:hover)]:group-hover:delay-0`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"text-sm text-white"}>
        <AccountMenuProfileItem
          href={"#"}
          profileName={"Karol"}
          imgSrc={"/images/default-blue.png"}
        />
        {ACCOUNT_MENU_LINKS.map((item, index) => (
          <AccountMenuNavItem
            key={item.href + "-" + index}
            href={item.href}
            label={item.label}
            Icon={item.Icon}
          />
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton className={"w-full text-center hover:underline"}>
            Sign out
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type AccountMenuNavItemProps = {
  href: string;
  label: string;
  Icon: IconType;
};

const AccountMenuNavItem = ({ href, label, Icon }: AccountMenuNavItemProps) => {
  return (
    <DropdownMenuItem className={"px-[10px] py-[5px]"}>
      <Link href={href} className={"flex items-center gap-2 hover:underline"}>
        <Icon className={"mx-1 text-neutral-400"} size={24} />
        {label}
      </Link>
    </DropdownMenuItem>
  );
};

type AccountMenuProfileItemProps = {
  href: string;
  imgSrc: string;
  profileName: string;
};

const AccountMenuProfileItem = ({
  href,
  imgSrc,
  profileName,
}: AccountMenuProfileItemProps) => {
  return (
    <DropdownMenuItem className={"px-[10px] py-[5px]"}>
      <Link href={href} className={"flex items-center gap-2 hover:underline"}>
        <div className={"relative h-8 w-8"}>
          <Image fill className={"rounded-md"} src={imgSrc} alt="userIcon" />
        </div>
        {profileName}
      </Link>
    </DropdownMenuItem>
  );
};

export default AccountMenu;
