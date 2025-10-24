"use client";
import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  

  return (
    <div className="h-full w-full">
      <div className="md:hidden">
      <MobileNav />
      </div>
      <div className="hidden md:block">
      <Navbar />
      </div>

      <main
      className="h-full flex w-full flex-col"
      style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
      {children}
      </main>
    </div>
  );
};

export default Layout;
