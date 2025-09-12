"use client";

import * as React from "react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import {
  // AudioWaveform,
  BookOpen,
  Bot,
  // Command,
  // Frame,
  // GalleryVerticalEnd,
  // Map,
  // PieChart,
  Info,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
// import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  // SidebarFooter,
  // SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  // teams: [
  //   {
  //     name: "Acme Inc",
  //     logo: GalleryVerticalEnd,
  //     plan: "Enterprise",
  //   },
  //   {
  //     name: "Acme Corp.",
  //     logo: AudioWaveform,
  //     plan: "Startup",
  //   },
  //   {
  //     name: "Evil Corp.",
  //     logo: Command,
  //     plan: "Free",
  //   },
  // ],
  navMain: [
    {
      title: "Vibe Coding",
      url: "#",
      icon: Bot,
      isActive: false,
      items: [
        {
          title: "Chat",
          url: "/chat",
        },
        {
          title: "Editor",
          url: "/editor",
        },
        {
          title: "Agent",
          url: "/agent",
        },
        {
          title: "MCP",
          url: "/mcp",
        },
      ],
    },
    {
      title: "Developer Tools",
      url: "#",
      icon: SquareTerminal,
      isActive: false,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "About",
      url: "#",
      icon: Info,
      // items: [],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

const useNavWithActive = () => {
  const location = useLocation();

  // Compute nav with active flags
  const navMain = useMemo(() => {
    const navMain = data.navMain.map((section) => {
      const hasActiveItem =
        section.items?.some(
          (item) => item.url !== "#" && location.pathname.startsWith(item.url)
        ) ?? false;

      return {
        ...section,
        isActive: hasActiveItem,
      };
    });
    return { ...data, navMain };
  }, [location.pathname]);

  return navMain;
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = useNavWithActive();

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
