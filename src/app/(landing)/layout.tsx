import MobileNav from "@/components/web/layout/shell/navbar/mobile-nav";
import Navbar from "@/components/web/layout/shell/navbar/landing-navbar";
import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  

  return (
    <div className="h-full w-full">
      <div className="md:hidden">
        <MobileNav isAuthPages={false} />
      </div>
      <div className="hidden md:block">
        <Navbar />
      </div>

      <main className="h-full flex w-full flex-col">{children}</main>
    </div>
  );
};

export default Layout;
