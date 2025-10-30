import MobileNav from "@/components/web/MobileNav";
import Navbar from "@/components/web/Navbar";
import { createClient } from "@/utils/supabase/server";
import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  console.log("Layout root - user data:", !!data?.user);

  return (
    <div className="h-full w-full">
      <div className="md:hidden">
        <MobileNav isAuthPages={!!data?.user} />
      </div>
      <div className="hidden md:block">
        <Navbar isAuthPages={!!data?.user} />
      </div>

      <main className="h-full flex w-full flex-col">{children}</main>
    </div>
  );
};

export default Layout;
