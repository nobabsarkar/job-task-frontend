"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import { UserRole } from "@/types/user.type";
import { adminRoutes } from "@/routes/admin.routes";
import { studentRoutes } from "@/routes/student.route";
import { sidebarItems } from "@/types/sidebar-type";

import {
  LayoutDashboard,
  FolderKanban,
  Users,
  BookOpen,
  Settings,
  FileText,
  ClipboardCheck,
  ChartNoAxesCombined,
  UserRound,
  GraduationCap,
  ShieldCheck,
  CircleDot,
  BriefcaseBusiness,
  ListChecks,
  Award,
  type LucideIcon,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarRoutes: Partial<Record<UserRole, sidebarItems>> = {
  SUPER_ADMIN: adminRoutes,
  MENTOR: adminRoutes,
  STUDENT: studentRoutes,
};

const iconMap: Record<string, LucideIcon> = {
  Dashboard: LayoutDashboard,
  Overview: LayoutDashboard,
  Projects: FolderKanban,
  "My Projects": FolderKanban,
  Users,
  Students: GraduationCap,
  Courses: BookOpen,
  Settings,
  Submissions: FileText,
  "My Submissions": FileText,
  Reviews: ClipboardCheck,
  "Review Projects": ClipboardCheck,
  "Project Submissions": ClipboardCheck,
  Analytics: ChartNoAxesCombined,
  Profile: UserRound,
  "My Profile": UserRound,
  Security: ShieldCheck,
  "Manage Users": Users,
  "Manage Projects": BriefcaseBusiness,
  Assignments: ListChecks,
  Achievements: Award,
};

function getItemIcon(title: string, url: string): LucideIcon {
  if (iconMap[title]) return iconMap[title];

  const normalizedUrl = url.toLowerCase();

  if (normalizedUrl.includes("project")) return FolderKanban;
  if (normalizedUrl.includes("user")) return Users;
  if (normalizedUrl.includes("review")) return ClipboardCheck;
  if (normalizedUrl.includes("course")) return BookOpen;
  if (normalizedUrl.includes("student")) return GraduationCap;
  if (normalizedUrl.includes("profile")) return UserRound;
  if (normalizedUrl.includes("analytic") || normalizedUrl.includes("stat"))
    return ChartNoAxesCombined;
  if (normalizedUrl.includes("setting")) return Settings;
  if (normalizedUrl.includes("submission")) return FileText;

  return CircleDot;
}

export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const routes: sidebarItems = sidebarRoutes[role] ?? [];

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className="border-r-5  bg-sidebar text-sidebar-foreground shadow-amber-100"
    >
      {/* Navigation */}
      {/* <SidebarContent className="gap-2 bg-sidebar px-3 py-2 text-sidebar-foreground bg-[oklch(33.754%_0.0035_286.055)]"> */}
      <SidebarContent className="gap-2 bg-sidebar px-3 py-2 text-sidebar-foreground ">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="p-0">
            <SidebarGroupLabel className="mb-2 h-8 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-sidebar-foreground/50 group-data-[collapsible=icon]:mb-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
              {group.title}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item, index) => {
                  const isActive =
                    pathname === item.url ||
                    (item.url !== "/" && pathname.startsWith(`${item.url}/`));

                  const Icon = getItemIcon(item.title, item.url);

                  return (
                    // <SidebarMenuItem key={item.url}>
                    <SidebarMenuItem
                      key={`${group.title}-${item.url}-${index}`}
                    >
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.title}
                        className="
                          relative h-10 rounded-xl px-3
                          text-[13px] font-medium
                          text-sidebar-foreground/70
                          transition-all duration-200 ease-out

                          hover:bg-sidebar-accent
                          hover:text-sidebar-accent-foreground

                          data-[active=true]:bg-primary
                          data-[active=true]:font-semibold
                          data-[active=true]:text-primary-foreground
                          data-[active=true]:shadow-sm

                          data-[active=true]:hover:bg-primary
                          data-[active=true]:hover:text-primary-foreground

                          group-data-[collapsible=icon]:!size-10
                          group-data-[collapsible=icon]:!justify-center
                          group-data-[collapsible=icon]:!p-0
                        "
                      >
                        <Link
                          href={item.url}
                          className="flex w-full items-center gap-3"
                        >
                          <Icon className="size-[18px] shrink-0" />
                          <span className="truncate group-data-[collapsible=icon]:hidden">
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
