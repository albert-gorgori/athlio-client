import { DASHBOARD_ROUTE } from "@/lib/constants";
import { redirect } from "next/navigation";
import { getUser } from "./actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  console.log("Auth layout rendering");
  // Check user session
  const user = await getUser();
  console.log("Auth layout user:", user);

  // if (user) redirect(DASHBOARD_ROUTE);

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
