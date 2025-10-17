import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {" "}
      {children}
      <div className="auth-asset">
        <div >
          <Image className="border-2 border-black rounded-lg" src="/icons/Fin.png" width={900} height={900} alt="auth image" />
        </div>
      </div>
    </main>
  );
}
