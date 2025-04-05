import Header from "@/components/header";
import { ReactNode } from "react";
import Footer from "@/components/footer";

type BrowseLayoutProps = {
  children: Readonly<ReactNode>;
};

const BrowseLayout = ({ children }: BrowseLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default BrowseLayout;
