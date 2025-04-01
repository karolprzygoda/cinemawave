import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

const AccountMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          "relative h-6 w-6 overflow-hidden rounded-md lg:h-10 lg:w-10"
        }
      >
        <Image fill src="/images/default-blue.png" alt="profile" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link
            href={"/faqPage"}
            className={"text-center text-sm text-white hover:underline"}
          >
            Centrum pomocy
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href={"/faqPage"}
            className={"text-center text-sm text-white hover:underline"}
          >
            Centrum pomocy
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>XD</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
