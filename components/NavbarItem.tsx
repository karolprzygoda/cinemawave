import Link from "next/link";

export default function NavbarItem({
  className,
  label,
  href,
}: {
  className?: string;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={(href as unknown) || URL}
      className={`${className} text-white hover:text-gray-300 transition`}
    >
      {label}
    </Link>
  );
}
