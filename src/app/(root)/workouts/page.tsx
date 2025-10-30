import React from "react";
import Breadcrumbs from "@/components/web/layout/shell/breadcrumbs/breadcrumbs-nav";
import { WORKOUTS_ROUTE } from "@/lib/constants";
import YourWorkouts from "./content";

const Workouts = () => {
  const items = [
    { title: "Navigation.overview", href: "#" },
    { title: "Navigation.workouts", href: WORKOUTS_ROUTE, isCurrent: true },
  ];
  return (
    <>
      <Breadcrumbs items={items}>
        <YourWorkouts />
      </Breadcrumbs>
    </>
  );
};

export default Workouts;
