"use client";

import {
  AuthForm,
  AuthFormContainer,
  AuthFormError,
  AuthFormFooter,
  AuthFormHeader,
  AuthFormSubmitButton,
  OAuthButton,
  OAuthButtonsWrapper,
} from "@/components/auth-form";
import Input from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInSchemaType } from "@/schemas/auth-schema";
import Link from "next/link";
import { signIn, signInWithGithub, signInWithGoogle } from "@/actions/auth-actions";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Button, buttonVariants } from "@/components/ui/button";

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
      <AuthFormHeader>Sign in</AuthFormHeader>
      <AuthFormError>{errors.root?.message}</AuthFormError>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
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
        <AuthFormSubmitButton isLoading={isLoading}>Sign in</AuthFormSubmitButton>
      </AuthForm>
      <span className={"text-muted-foreground my-3 block w-full text-center"}>OR</span>
      <Button variant={"secondary"}>Sign in as Guest</Button>
      <OAuthButtonsWrapper>
        <OAuthButton Icon={FaGithub} signInWithOAuth={signInWithGithub} setError={setError} />
        <OAuthButton Icon={FaGoogle} signInWithOAuth={signInWithGoogle} setError={setError} />
      </OAuthButtonsWrapper>
      <AuthFormFooter>
        <span>Don&#39;t have an account?</span>
        <Link href={"/sign-up"} className={buttonVariants({ variant: "link", size: "auto" })}>
          Sign up
        </Link>
      </AuthFormFooter>
    </AuthFormContainer>
  );
};

export default SignInPage;
