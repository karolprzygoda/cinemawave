import React, { HTMLProps, ReactNode } from "react";
import { IconType } from "react-icons";
import { PulseLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { EmptyObject, UseFormSetError } from "react-hook-form";

type AuthFormContainerProps = {
  children: ReactNode;
};

const AuthFormContainer = ({ children }: AuthFormContainerProps) => {
  return (
    <main
      className={
        "rounded-radius mx-auto flex w-full flex-col bg-black/75 px-4 py-12 lg:my-28 lg:max-w-md lg:px-10"
      }
    >
      {children}
    </main>
  );
};

type OAuthButtonProps = {
  Icon: IconType;
  setError: UseFormSetError<EmptyObject>;
  signInWithOAuth: () => Promise<{ errorMessage: string } | undefined>;
};

const OAuthButton = ({ Icon, setError, signInWithOAuth }: OAuthButtonProps) => {
  const handleOAuthSignIn = async () => {
    const error = await signInWithOAuth();
    if (error) {
      setError("root", {
        type: "manual",
        message: error.errorMessage,
      });
    }
  };

  return (
    <Button
      onClick={handleOAuthSignIn}
      variant={"fab"}
      size={"fab"}
      aria-label={Icon.name + "sign in button"}
    >
      <Icon />
    </Button>
  );
};

type AuthFormHeaderProps = {
  children: ReactNode;
};

const AuthFormHeader = ({ children }: AuthFormHeaderProps) => {
  return <h2 className={"mb-8 text-4xl font-semibold"}>{children}</h2>;
};

type AuthFormErrorProps = {
  children?: ReactNode;
};

const AuthFormError = ({ children }: AuthFormErrorProps) => {
  if (!children) {
    return null;
  }

  return <div className={`bg-warning text-accent-foreground mb-8 rounded-md p-3`}>{children}</div>;
};

type AuthFormSubmitButtonProps = {
  isSubmitting: boolean;
  children: string;
};

const AuthFormSubmitButton = ({ isSubmitting, children }: AuthFormSubmitButtonProps) => {
  return (
    <Button type={"submit"}>
      {isSubmitting ? <PulseLoader color={"#fff"} size={10} /> : children}
    </Button>
  );
};

type OAuthButtonsWrapper = {
  children: ReactNode;
};

const OAuthButtonsWrapper = ({ children }: OAuthButtonsWrapper) => {
  return <div className={"my-5 flex items-center justify-center gap-4"}>{children}</div>;
};

type AuthFormFooterProps = {
  children: ReactNode;
};

const AuthFormFooter = ({ children }: AuthFormFooterProps) => {
  return (
    <div className={"text-muted-foreground flex flex-wrap items-center justify-center gap-2"}>
      {children}
    </div>
  );
};

type AuthForm = {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
} & HTMLProps<HTMLFormElement>;

const AuthForm = ({ children, onSubmit, ...rest }: AuthForm) => {
  return (
    <form onSubmit={onSubmit} className={"flex flex-col gap-5"} {...rest}>
      {children}
    </form>
  );
};

export {
  AuthFormContainer,
  AuthFormHeader,
  AuthFormError,
  OAuthButton,
  AuthFormSubmitButton,
  OAuthButtonsWrapper,
  AuthFormFooter,
  AuthForm,
};
