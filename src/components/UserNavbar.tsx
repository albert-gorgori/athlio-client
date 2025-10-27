import { USER_NAVBAR_HEIGHT} from "../lib/constants";
import Image from "next/image";
import Link from "next/link";
import React, { } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { signOut } from "@/app/(auth)/actions";

function Navbar() {
  const t = useTranslations();
  return (
    <header
      className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur"
      style={{ height: USER_NAVBAR_HEIGHT }}
    >
      <div className="mx-auto flex h-full w-full  items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/android-logo-big.png"
            alt="Athlio logo"
            width={28}
            height={28}
            priority
          />
          <span className="text-lg font-semibold">Athlio</span>
        </Link>

        

          <div className="flex items-center gap-2">

            <Button className="cursor-pointer" onClick={signOut}>
              {t("Navigation.signOut")}
            </Button>
          </div>
      </div>
    </header>
  );
}

export default Navbar;
