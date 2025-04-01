"use client";

import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { IoMdCloseCircleOutline, IoMdEye, IoMdEyeOff } from "react-icons/io";
import { IconType } from "react-icons";

type InputProps = {
  label: string;
  invalid?: boolean;
  errorMessage?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, invalid, errorMessage, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={"flex flex-col gap-1.5"}>
      <div
        className={cn(
          "relative rounded-md border border-neutral-600 bg-neutral-900/70 focus-within:border-white",
          invalid ? "border-red-600" : "",
        )}
      >
        <input
          {...props}
          className={`peer w-full bg-transparent px-2.5 ps-4 pt-5 pb-2.5 text-white focus:outline-0`}
          placeholder=" "
          id={props.name}
          aria-invalid={invalid}
          type={showPassword ? "text" : props.type}
        />
        <label
          htmlFor={props.name}
          className="absolute start-4 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400"
        >
          {label}
        </label>
        <TogglePassword
          type={props.type}
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

const TogglePassword = ({
  type,
  Icon,
  handleTogglePassword,
}: TogglePasswordProps) => {
  if (type !== "password") return null;

  return (
    <button
      type={"button"}
      onClick={handleTogglePassword}
      className="absolute end-2 top-2.5 flex cursor-pointer items-center justify-center rounded-full p-2 transition hover:bg-neutral-500"
      aria-label={Icon === IoMdEye ? "Show password" : "Hide password"}
    >
      <Icon className="text-xl text-white" />
    </button>
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
    <div className="flex items-center gap-1 text-sm whitespace-pre-wrap text-red-600">
      <IoMdCloseCircleOutline size={18} />
      {message}
    </div>
  );
};

export default Input;
