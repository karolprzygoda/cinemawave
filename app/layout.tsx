import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import localFont from "next/font/local";

const netflix = localFont({
  src: [
    {
      path: "../public/fonts/NetflixSans_W_Rg.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NetflixSans_W_Md.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/NetflixSans_W_Md.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/NetflixSans_W_Bd.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "cinemawave",
  description: "Nextflix clone",
};

type RootLayoutProps = {
  children: Readonly<ReactNode>;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body className={`${netflix.className} bg-background min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
