import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslations } from "next-intl";

export default function Breadcrumbs({
  children,
  items,
}: Readonly<{
  children: React.ReactNode;
  items: Array<{ title: string; href: string; isCurrent?: boolean }>;
}>) {
    const t = useTranslations();
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    {item.isCurrent ? (
                      <BreadcrumbPage>{t(item.title)}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={item.href}>{t(item.title)}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < items.length - 1 && <BreadcrumbSeparator />}
                </React.Fragment>
              ))}   
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      {children}
    </SidebarInset>
  );
}
