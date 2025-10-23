import { DASHBOARD_ROUTE } from "@/lib/constants";
import { createClient, getUser } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check user session
  const user = await getUser();

  if (user) redirect(DASHBOARD_ROUTE);

  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {" "}
      {children}
      {/* <div className="auth-asset">
        <div >
          <Image className="border-2 border-black rounded-lg" src="/authImage.JPG" width={900} height={900} alt="auth image" />
        </div>
      </div> */}
    </main>
  );
}
