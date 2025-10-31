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
import { NavUser } from "./nav-user";
import { NavSecondary } from "./nav-secondary";
import { IconHelp, IconSettings } from "@tabler/icons-react";
import { getUserProfile } from "@/app/data/profile/require-profile";
import { Skeleton } from "@/components/ui/skeleton";

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
  ],
  navSecondary: [
    {
      title: "Settings",
      url: SETTINGS_ROUTE,
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<NavUserLoader />}>
          <NavUserRender />
        </Suspense>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

async function NavUserRender() {
  const user = await getUserProfile();

  return (
    <>
      <NavUser user={user}/>
    </>
  );
}

function NavUserLoader() {
  return (
    <div className="flex items-center space-x-4 w-full">
      <Skeleton className="h-10 w-12 rounded-full dark:bg-gray-300 bg-gray-700" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-[80%] dark:bg-gray-300 bg-gray-700" />
        <Skeleton className="h-4 dark:bg-gray-300 bg-gray-700" />
      </div>
    </div>
  );
}
