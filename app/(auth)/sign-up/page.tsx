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
import { signUpSchema, SignUpSchemaType } from "@/schemas/auth-schema";
import Link from "next/link";
import { signUp } from "@/actions/auth-actions";
import GithubOAuthButton from "@/components/github-oauth-button";
import GoogleOAuthButton from "@/components/google-oauth-button";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    shouldFocusError: false,
  });

  const onSubmit = async (data: SignUpSchemaType) => {
    const { error } = await signUp(data);
    if (error) {
      setError("root", {
        type: "manual",
        message: error,
      });
    }
  };

  return (
    <AuthFormContainer>
      <AuthFormError>{errors.root?.message}</AuthFormError>
      <AuthFormHeader label={"Sign up"} />
      <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-5"}>
        <Input
          label={"Email"}
          type={"text"}
          invalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email", { required: true })}
        />
        <Input
          label={"Name"}
          type={"text"}
          invalid={!!errors.name}
          errorMessage={errors.name?.message}
          {...register("name")}
        />
        <Input
          label={"Last Name"}
          type={"text"}
          invalid={!!errors.lastName}
          errorMessage={errors.lastName?.message}
          {...register("lastName")}
        />
        <Input
          label={"Password"}
          type={"password"}
          invalid={!!errors.password}
          errorMessage={errors.password?.message}
          {...register("password")}
        />
        <Input
          label={"Confirm Password"}
          type={"password"}
          invalid={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <AuthFormSubmitButton label={"Sign up"} isLoading={isLoading} />
      </form>
      <div className={"my-5 flex items-center justify-center gap-4"}>
        <GoogleOAuthButton setError={setError} />
        <GithubOAuthButton setError={setError} />
      </div>
      <div className={"flex flex-wrap justify-center gap-2"}>
        <span className={"text-neutral-400"}>Already have an account?</span>
        <Link
          href={"/sign-in"}
          className={
            "inline cursor-pointer text-white underline underline-offset-5"
          }
        >
          Sign in
        </Link>
      </div>
    </AuthFormContainer>
  );
};

export default SignUpPage;
