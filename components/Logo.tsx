import Link from "next/link";
import React from "react";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href={"/"}>
      <img
        className={`h-6 lg:h-10 cursor-pointer pe-6  ${className}`}
        src="/images/logo.png"
        alt="logo"
      />
    </Link>
  );
}
