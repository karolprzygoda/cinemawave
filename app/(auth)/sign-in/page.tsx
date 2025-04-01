"use client";

import {
  AuthFormContainer,
  AuthFormError,
  AuthFormHeader,
  AuthFormSubmitButton,
} from "@/components/auth-form";
import Input from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInSchemaType } from "@/schemas/auth-schema";
import Link from "next/link";
import { signIn } from "@/actions/auth-actions";
import GithubOAuthButton from "@/components/github-oauth-button";
import GoogleOAuthButton from "@/components/google-oauth-button";

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    setError,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    shouldFocusError: false,
  });

  const onSubmit = async (data: SignInSchemaType) => {
    const { error } = await signIn(data);
    if (error) {
      setError("root", {
        type: "manual",
        message: error,
      });
    }
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader label={"Sign in"} />
      <AuthFormError>{errors.root?.message}</AuthFormError>
      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-5"}>
        <Input
          label={"Email"}
          type={"text"}
          invalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email")}
        />
        <Input
          label={"Password"}
          type={"password"}
          invalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
        <AuthFormSubmitButton label={"Sign in"} isLoading={isLoading} />
      </form>
      <div className={"my-5 flex items-center justify-center gap-4"}>
        <GoogleOAuthButton setError={setError} />
        <GithubOAuthButton setError={setError} />
      </div>
      <div className={"flex flex-wrap justify-center gap-2"}>
        <span className={"text-neutral-400"}>Don&#39;t have an account?</span>
        <Link
          href={"/sign-up"}
          className={
            "inline cursor-pointer text-white underline underline-offset-5"
          }
        >
          Sign up
        </Link>
      </div>
    </AuthFormContainer>
  );
};

export default SignInPage;
