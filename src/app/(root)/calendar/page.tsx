import Breadcrumbs from "@/components/breadcrumbs-sidebar";
import { CALENDAR_ROUTE } from "@/lib/constants";
import React from "react";

const page = () => {
  const items = [
    { title: "Navigation.overview", href: "#" },
    { title: "Navigation.calendar", href: CALENDAR_ROUTE, isCurrent: true },
  ];
  return (
    <Breadcrumbs items={items}>
      <div>Calendar</div>
    </Breadcrumbs>
  );
};

export default page;
