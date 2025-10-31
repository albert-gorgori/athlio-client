import * as React from "react";
import { BookOpen, Bot, Settings2, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/web/layout/shell/sidebar/nav-main";
import { TeamSwitcher } from "@/components/web/layout/shell/sidebar/team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  CALENDAR_ROUTE,
  COACH_CHAT_ROUTE,
  DASHBOARD_ROUTE,
  SETTINGS_ROUTE,
  WORKOUTS_ROUTE,
} from "@/lib/constants";
import { Suspense } from "react";
import { NavUser, NavUserLoader } from "./nav-user";

//TODO: Make the sidebar dynamic based on user role and permissions
//TODO: Highlight the active sidebar item
//TODO: Optimize the sidebar for mobile view
//TODO: Add collapsible sections to the sidebar
//TODO: Implement dark mode support for the sidebar

// This is sample data.
const data = {
  user: {
    name: "Albert Gorgori",
    email: "albert.gorgori@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Navigation.dashboard",
      url: DASHBOARD_ROUTE,
      icon: SquareTerminal,
      isActive: true,
      items: [],
    },
    {
      title: "Navigation.coachChat",
      url: COACH_CHAT_ROUTE,
      icon: Bot,
      items: [],
    },
    {
      title: "Navigation.calendar",
      url: CALENDAR_ROUTE,
      icon: BookOpen,
      items: [],
    },
    {
      title: "Navigation.workouts",
      url: WORKOUTS_ROUTE,
      icon: BookOpen,
      items: [],
    },
    {
      title: "Navigation.settings",
      url: SETTINGS_ROUTE,
      icon: Settings2,
      items: [],
    },
  ],
};

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<NavUserLoader />}> 
          <NavUser />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
