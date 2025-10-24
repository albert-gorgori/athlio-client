
import Sidebar from "@/components/Sidebar";
import { NAVBAR_HEIGHT, SIGN_IN_ROUTE } from "@/lib/constants";
import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import UserNavbar from "@/components/UserNavbar";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

   console.log("Layout root protected - starting auth check ---- ASYNC LAYOUT EN (ROOT) ----");
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  console.log("Layout root protected - user data:", data);
  if (error || !data?.user) {
    redirect(SIGN_IN_ROUTE)
  }
  

  return (
    <div className="h-full w-full">
      <UserNavbar />
      <Sidebar />
      <main className={`h-full flex w-full flex-col`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
