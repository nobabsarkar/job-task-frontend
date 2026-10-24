"use client";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { ReactNode } from "react";
import { UserRole } from "@/types/user.type";
import { DashboardSidebar } from "./dashboard-sidebar";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: UserRole;
}) {
  return (
    <SidebarProvider className="mx-auto max-w-7xl transform-gpu">
      <DashboardSidebar role={role} />

      <SidebarInset>
        <div className="">
          <SidebarTrigger className="-ml-1 lg:hidden cursor-pointer" />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
