"use client";

import { ButtonHTMLAttributes } from "react";
import { signOut } from "@/actions/auth-actions";
import { cn } from "@/lib/utils";

type SignOutButton = {
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "className">;

const SignOutButton = ({ className, ...props }: SignOutButton) => {
  const handleSignOut = async () => {
    const error = signOut();

    if (error) {
      console.log(error);
    }
  };

  return (
    <button
      className={cn("inline-flex cursor-pointer", className)}
      onClick={handleSignOut}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default SignOutButton;
