
import Sidebar from "@/components/Sidebar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import React from "react";
import { getUser } from "../(auth)/actions";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
    console.log("Auth layout rendering");
    // Check user session
    const user = await getUser();
    console.log("Auth layout user:", user);
  return (
    <div className="h-full w-full">
      <Sidebar />
      <main className={`h-full flex w-full flex-col`} style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
