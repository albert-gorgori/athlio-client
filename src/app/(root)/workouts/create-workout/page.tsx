import React from "react";
import Breadcrumbs from "@/components/web/layout/shell/breadcrumbs/breadcrumbs-nav";
import { WORKOUTS_ROUTE } from "@/lib/constants";


const CreateWorkout = () => {
  const items = [
    { title: "Navigation.overview", href: "#" },
    { title: "Navigation.workouts", href: WORKOUTS_ROUTE},
    { title: "Navigation.createWorkout", href: "#", isCurrent: true },
  ];
  return (
    <>
      <Breadcrumbs items={items}>
        Create workout page
      </Breadcrumbs>
    </>
  );
};

export default CreateWorkout;
