import { signInWithGithub } from "@/actions/auth-actions";
import { OAuthButtonWrapperProps } from "@/lib/types";
import { FaGithub } from "react-icons/fa";
import { OAuthButton } from "@/components/auth-form";

const GithubOAuthButton = ({ setError }: OAuthButtonWrapperProps) => {
  const onGithubSignIn = async () => {
    const error = await signInWithGithub();
    if (error) {
      setError("root", {
        type: "manual",
        message: error.errorMessage,
      });
    }
  };

  return <OAuthButton onClick={onGithubSignIn} Icon={FaGithub} />;
};

export default GithubOAuthButton;
