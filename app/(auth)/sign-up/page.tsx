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
import { signUpSchema, SignUpSchemaType } from "@/schemas/auth-schema";
import Link from "next/link";
import { signInWithGithub, signInWithGoogle, signUp } from "@/actions/auth-actions";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { buttonVariants } from "@/components/ui/button";

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
      <AuthFormHeader>Sign Up</AuthFormHeader>
      <AuthForm onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={"Email"}
          type={"text"}
          invalid={!!errors.email}
          errorMessage={errors.email?.message}
          {...register("email")}
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
        <AuthFormSubmitButton isLoading={isLoading}>Sign up</AuthFormSubmitButton>
      </AuthForm>
      <OAuthButtonsWrapper>
        <OAuthButton Icon={FaGithub} signInWithOAuth={signInWithGithub} setError={setError} />
        <OAuthButton Icon={FaGoogle} signInWithOAuth={signInWithGoogle} setError={setError} />
      </OAuthButtonsWrapper>
      <AuthFormFooter>
        <span>Already have an account?</span>
        <Link href={"/sign-in"} className={buttonVariants({ variant: "link", size: "auto" })}>
          Sign in
        </Link>
      </AuthFormFooter>
    </AuthFormContainer>
  );
};

export default SignUpPage;
