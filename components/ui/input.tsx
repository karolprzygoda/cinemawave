"use client";

import React, { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { IoMdCloseCircleOutline, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { IconType } from "react-icons";
import { Button } from "@/components/ui/button";

type InputProps = {
  label: string;
  invalid?: boolean;
  errorMessage?: string;
  type?: HTMLInputTypeAttribute;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, invalid, errorMessage, type, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={"flex flex-col gap-1.5"}>
      <div
        className={cn(
          "border-border focus-within:border-foreground rounded-radius bg-background/70 relative border",
          invalid && "border-destructive",
        )}
      >
        <input
          className={`peer w-full bg-transparent px-2.5 ps-4 pt-5 pb-2.5 focus:outline-0`}
          placeholder=" "
          id={props.name}
          aria-invalid={invalid}
          type={showPassword ? "text" : type}
          {...props}
        />
        <label
          htmlFor={props.name}
          className="text-muted-foreground absolute start-4 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
        >
          {label}
        </label>
        <TogglePassword
          type={type}
          handleTogglePassword={handleToggleShowPassword}
          Icon={showPassword ? IoMdEyeOff : IoMdEye}
        />
      </div>
      <InputErrorMessage message={errorMessage} />
    </div>
  );
};

type TogglePasswordProps = {
  type: HTMLInputTypeAttribute | undefined;
  Icon: IconType;
  handleTogglePassword: () => void;
};

const TogglePassword = ({ type, Icon, handleTogglePassword }: TogglePasswordProps) => {
  if (type !== "password") return null;

  return (
    <Button
      variant={"fab"}
      size={"auto"}
      onClick={handleTogglePassword}
      className="hover:bg-border-muted text-muted-foreground absolute end-2 top-2.5 bg-transparent p-2"
      aria-label={Icon === IoMdEye ? "Show password" : "Hide password"}
    >
      <Icon />
    </Button>
  );
};

type InputErrorMessageProps = {
  message?: string;
};

const InputErrorMessage = ({ message }: InputErrorMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="text-destructive flex items-center gap-1 text-sm whitespace-pre-wrap">
      <IoMdCloseCircleOutline size={18} />
      {message}
    </div>
  );
};

export default Input;
