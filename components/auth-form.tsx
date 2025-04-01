import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { PulseLoader } from "react-spinners";

type AuthFormContainerProps = {
  children: ReactNode;
};

const AuthFormContainer = ({ children }: AuthFormContainerProps) => {
  return (
    <main
      className={
        "mx-auto w-full rounded-md bg-black/75 px-4 py-12 lg:my-20 lg:max-w-md lg:px-10"
      }
    >
      {children}
    </main>
  );
};

type OAuthButtonProps = {
  onClick: () => void;
  Icon: IconType;
};

const OAuthButton = ({ onClick, Icon }: OAuthButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80"
      }
    >
      <Icon size={30} />
    </button>
  );
};

type AuthFormHeaderProps = {
  label: string;
};

const AuthFormHeader = ({ label }: AuthFormHeaderProps) => {
  return <h2 className={"mb-8 text-4xl font-semibold text-white"}>{label}</h2>;
};

type AuthFormErrorProps = {
  children?: ReactNode;
};

const AuthFormError = ({ children }: AuthFormErrorProps) => {
  if (!children) {
    return null;
  }

  return <div className={`mb-8 rounded-md bg-yellow-600 p-3`}>{children}</div>;
};

type AuthFormSubmitButtonProps = {
  isLoading: boolean;
  label: string;
};

const AuthFormSubmitButton = ({
  isLoading,
  label,
}: AuthFormSubmitButtonProps) => {
  return (
    <button
      type={"submit"}
      className={
        "w-full cursor-pointer rounded-md bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
      }
    >
      {isLoading ? <PulseLoader color={"#fff"} size={10} /> : label}
    </button>
  );
};

export {
  AuthFormContainer,
  AuthFormHeader,
  AuthFormError,
  OAuthButton,
  AuthFormSubmitButton,
};
