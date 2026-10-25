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
    <SidebarProvider className="mx-auto max-w-7xl transform-gpu ">
      <div>
        <DashboardSidebar role={role} />
      </div>

      <SidebarInset>
        <div>
          <SidebarTrigger className="-ml-1 cursor-pointer" />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
