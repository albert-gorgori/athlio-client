import { NAVBAR_HEIGHT, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/", label: "Navigation.features" },
  { href: "/pricing", label: "Navigation.pricing" },
  { href: "/blog", label: "Navigation.blog" },
  { href: "/support", label: "Navigation.support" },
];

 function Navbar({ isAuthPages }: { isAuthPages?: boolean }) {

  const t = useTranslations();
  return (
    <header
      className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur"
      style={{ height: NAVBAR_HEIGHT }}
    >
      <div className="mx-auto flex h-full w-full  items-center justify-between px-12">
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

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {isAuthPages ? (
            <Button asChild >
              <Link href="/dashboard">{t("Navigation.dashboard")}</Link>
            </Button>
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href={SIGN_IN_ROUTE}>{t("Navigation.signIn")}</Link>
              </Button>
              <Button asChild>
                <Link href={SIGN_UP_ROUTE}>{t("Navigation.getStarted")}</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
