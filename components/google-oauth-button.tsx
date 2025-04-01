import { signInWithGoogle } from "@/actions/auth-actions";
import { OAuthButton } from "@/components/auth-form";
import { OAuthButtonWrapperProps } from "@/lib/types";
import { FcGoogle } from "react-icons/fc";

const GoogleOAuthButton = ({ setError }: OAuthButtonWrapperProps) => {
  const onGoogleSignIn = async () => {
    const error = await signInWithGoogle();
    if (error) {
      setError("root", {
        type: "manual",
        message: error.errorMessage,
      });
    }
  };

  return <OAuthButton onClick={onGoogleSignIn} Icon={FcGoogle} />;
};

export default GoogleOAuthButton;
