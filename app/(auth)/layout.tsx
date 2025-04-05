import Footer from "@/components/footer";
import { ReactNode } from "react";
import Logo from "@/components/logo";

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden before:absolute before:inset-0 before:-z-10 before:bg-black before:bg-cover before:bg-fixed before:bg-center before:bg-no-repeat before:brightness-50 before:content-[''] lg:before:bg-[url('/images/auth-background.jpg')]">
      <Logo height={48} width={200} className={"ms-3 py-5"} />
      <div className={"flex flex-1 items-center"}>{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
