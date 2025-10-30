"use client";
import { NAVBAR_HEIGHT, SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../../lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

type NavItem = {
  href: string;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/features", label: "Navigation.features" },
  { href: "/pricing", label: "Navigation.pricing" },
  { href: "/blog", label: "Navigation.blog" },
  { href: "/support", label: "Navigation.support" },
];

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function MobileNav({ isAuthPages }: { isAuthPages?: boolean }) {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur"
      style={{ height: NAVBAR_HEIGHT }}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  aria-label="Open menu"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-accent"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-foreground"
                  >
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                </button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-[264px] border-none p-0 bg-background"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Menú de navegación</SheetTitle>
                </SheetHeader>
                <div className="flex h-full flex-col">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="flex items-center gap-2 border-b px-4 py-3"
                    >
                      <Image
                        src="/android-logo-big.png"
                        alt="Athlio logo"
                        width={28}
                        height={28}
                        priority
                      />
                      <span className="text-lg font-semibold">Athlio</span>
                    </Link>
                  </SheetClose>

                  <nav className="flex flex-col gap-1 p-2">
                    {navItems.map((item) => {
                      const isActive =
                        pathname === item.href ||
                        pathname.startsWith(`${item.href}/`);

                      return (
                        <SheetClose asChild key={item.href}>
                          <Link
                            href={item.href}
                            className={cx(
                              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                              "hover:bg-accent hover:text-accent-foreground",
                              isActive && "bg-accent text-accent-foreground"
                            )}
                          >
                            {t(item.label)}
                          </Link>
                        </SheetClose>
                      );
                    })}
                  </nav>

                  <div className="mt-auto flex flex-col gap-2 border-t p-4">
                    {isAuthPages ? (
                      <SheetClose asChild>
                        <Button asChild className="w-full">
                          <Link href="/dashboard">
                            {t("Navigation.dashboard")}
                          </Link>
                        </Button>
                      </SheetClose>
                    ) : (
                      <>
                        <SheetClose asChild>
                          <Button asChild variant="ghost" className="w-full">
                            <Link href={SIGN_IN_ROUTE}>
                              {t("Navigation.signIn")}
                            </Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button asChild className="w-full">
                            <Link href={SIGN_UP_ROUTE}>
                              {t("Navigation.getStarted")}
                            </Link>
                          </Button>
                        </SheetClose>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

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
        </div>
      </div>
    </header>
  );
}

export default MobileNav;
