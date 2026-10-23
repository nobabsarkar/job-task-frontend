"use client";

import Logo from "@/assets/svg/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { UserRole } from "@/types/user.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminRoutes } from "@/routes/admin.routes";
import { mentorRoutes } from "@/routes/mentor.routes";
import { studentRoutes } from "@/routes/student.route";
import { sidebarItems } from "@/types/sidebar-type";

const sidebarRoutes: Partial<Record<UserRole, sidebarItems>> = {
  SUPER_ADMIN: adminRoutes,
  MENTOR: mentorRoutes,
  STUDENT: studentRoutes,
};

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();

  const routes: sidebarItems = sidebarRoutes[role] ?? [];

  return (
    <Sidebar collapsible="icon" variant="sidebar" className="border-r">
      {/* Logo */}
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="CityCare"
              className="
                h-12
                w-full
                rounded-lg
                px-2
                hover:bg-sidebar-accent
                hover:text-sidebar-accent-foreground

                group-data-[collapsible=icon]:justify-center
                group-data-[collapsible=icon]:px-0
              "
            >
              <Link
                href="/"
                className="
                  flex
                  w-full
                  items-center
                  gap-2
                  overflow-hidden
                  group-data-[collapsible=icon]:justify-center
                "
              >
                {/* LOGO - ALWAYS SHOW */}
                <div className="flex shrink-0 items-center justify-center">
                  <Logo />
                </div>

                {/* TEXT - HIDE WHEN COLLAPSED */}
                <div
                  className="
                    flex
                    min-w-0
                    flex-1
                    flex-col
                    group-data-[collapsible=icon]:hidden
                  "
                >
                  <span className="truncate text-lg font-bold tracking-tight">
                    CityCare
                  </span>

                  <span className="truncate text-[10px] leading-none text-muted-foreground">
                    Smart City Services
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-2 py-4">
        {routes.map((group: any) => (
          <SidebarGroup key={group.title} className="p-0">
            <SidebarGroupLabel
              className="
                mb-2
                px-2
                text-[11px]
                font-semibold
                uppercase
                tracking-wider
                text-muted-foreground
                group-data-[collapsible=icon]:hidden
              "
            >
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="w-full gap-1">
                {group.items.map((item: any) => {
                  const isActive =
                    pathname === item.url ||
                    pathname.startsWith(`${item.url}/`);

                  return (
                    <SidebarMenuItem key={item.title} className="w-full">
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.title}
                        className="
                          h-10
                          w-full
                          cursor-pointer
                          rounded-lg
                          px-3
                          text-muted-foreground
                          transition-all
                          duration-200

                          hover:bg-primary/10
                          hover:text-primary

                          data-[active=true]:bg-primary
                          data-[active=true]:text-primary-foreground
                          data-[active=true]:shadow-sm

                          data-[active=true]:hover:bg-primary
                          data-[active=true]:hover:text-primary-foreground

                          group-data-[collapsible=icon]:justify-center
                          group-data-[collapsible=icon]:px-0
                        "
                      >
                        <Link
                          href={item.url}
                          className="flex w-full items-center gap-2"
                        >
                          <span className="truncate font-medium">
                            {item.title}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
