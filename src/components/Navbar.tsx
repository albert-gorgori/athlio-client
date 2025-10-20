import { NAVBAR_HEIGHT } from "../lib/constants";
import Image from "next/image";
import Link from "next/link";
import React, { use } from "react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Button");
  return (
    <div
      className="fixed top-0 left-0 w-full z-50 shadow-xl"
      style={{ height: `${NAVBAR_HEIGHT}px` }}
    >
      <div className="flex items-center justify-between w-full py-4 px-16 bg-primary-700 text-black">
      <Link
        href="/"
        className="cursor-pointer hover:!text-primary-300"
        scroll={false}
      >
        <div className="flex items-center gap-2">
        <Image
          src="/android-logo-big.png"
          alt="Athlio Logo"
          width={36}
          height={36}
          className="w-8 h-8"
        />
        <div className="text-lg font-bold text-blue-500">THLIO</div>
        </div>
      </Link>

      <div className="flex items-center gap-2 md:gap-3">
        <Button asChild variant="ghost" size="sm">
        <Link href="/sign-in" scroll={false}>
          {t("signIn")}
        </Link>
        </Button>
        <Button asChild size="sm">
        <Link href="/sign-up" scroll={false}>
          {t("signUp")}
        </Link>
        </Button>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
