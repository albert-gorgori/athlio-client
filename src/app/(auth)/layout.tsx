import { createClient } from "@/utils/supabase/server";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   console.log("Layout root protected - starting auth check ---- ASYNC LAYOUT EN (ROOT) ----");
    const supabase = await createClient()
    const { data } = await supabase.auth.getUser()
  
    console.log("Layout root protected - user data:", data);
    

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
