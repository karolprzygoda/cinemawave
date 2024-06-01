import React, { ChangeEventHandler, FocusEventHandler, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

export default function Input({
  id,
  label,
  type,
  value,
  onChange,
  onBlur,
  isInvalid,
  isValid,
  errorMessage,
}: {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: ChangeEventHandler;
  onBlur: FocusEventHandler;
  isInvalid: boolean;
  isValid: boolean;
  errorMessage: string;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div
        className={`border rounded-md bg-neutral-900 bg-opacity-70 focus-within:border-white ${isInvalid ? "border-red-600" : ""} ${isValid ? "border-green-600" : ""} ${!isValid && !isInvalid ? "border-neutral-400" : ""}`}
      >
        <div className={`relative flex `}>
          <input
            type={showPassword && type === "password" ? "text" : type}
            id={id}
            onChange={onChange}
            name={id}
            value={value}
            onBlur={(e) => {
              onBlur(e);
              setIsFocused(false);
            }}
            onFocus={() => setIsFocused(true)}
            className={`bg-transparent px-2.5 pb-2.5 pt-5 w-80 text-white ps-4 peer focus:outline-0`}
            placeholder=" "
          />
          <label
            htmlFor={id}
            className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            {label}
          </label>
          {type === "password" && isFocused && (
            <button
              type={"button"}
              onMouseDown={(e) => {
                e.preventDefault();
                setShowPassword(!showPassword);
              }}
              className="p-2 flex items-center justify-center absolute end-2 top-2.5 transition hover:bg-neutral-500 rounded-full"
            >
              {showPassword ? (
                <IoMdEyeOff className="text-white text-xl" />
              ) : (
                <IoMdEye className="text-white text-xl" />
              )}
            </button>
          )}
        </div>
      </div>
      {isInvalid && errorMessage && (
        <div className="text-red-600 text-sm ms-1 flex items-center whitespace-pre-wrap">
          <IoMdCloseCircleOutline size={18} className="text-red-600 me-1" />
          {errorMessage}
        </div>
      )}
    </>
  );
}
