import Link from "next/link";
import { MouseEventHandler } from "react";

export default function NavbarItem({
  className,
  label,
  href = "#",
  currentPage,
  onClick,
  hoverOff,
}: {
  className?: string;
  label: string;
  href?: string;
  currentPage?: boolean;
  onClick?: MouseEventHandler;
  hoverOff?: boolean;
}) {
  return (
    <Link
      onClick={onClick}
      href={(href as unknown) || URL}
      className={`${className} text-white ${hoverOff ? "" : "hover:text-neutral-400"}  transition ${currentPage ? "text-opacity-100" : "text-opacity-75"}`}
    >
      {label}
    </Link>
  );
}
