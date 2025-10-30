import Breadcrumbs from "@/components/web/breadcrumbs-sidebar";
import { CALENDAR_ROUTE } from "@/lib/constants";
import React from "react";
import CalendarContent from "./content";

const page = () => {
  const items = [
    { title: "Navigation.overview", href: "#" },
    { title: "Navigation.calendar", href: CALENDAR_ROUTE, isCurrent: true },
  ];
  return (
    <Breadcrumbs items={items}>
      <CalendarContent />
    </Breadcrumbs>
  );
};

export default page;
