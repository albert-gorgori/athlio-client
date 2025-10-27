import React from "react";
import Breadcrumbs from "@/components/breadcrumbs-sidebar";
import { SETTINGS_ROUTE } from "@/lib/constants";
import SettingsContent from "./content";

const Settings = () => {
  const items = [
    { title: "Navigation.overview", href: "#" },
    { title: "Navigation.settings", href: SETTINGS_ROUTE, isCurrent: true },
  ];
  return (
    <>
      <Breadcrumbs items={items}>
        <SettingsContent />
      </Breadcrumbs>
    </>
  );
};

export default Settings;
