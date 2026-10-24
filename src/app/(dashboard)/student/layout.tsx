/** biome-ignore-all lint/a11y/useValidAriaRole: <explanation> */
import DashboardShell from "@/components/(dashboard)/dashboard-shell";
import { DashboardSidebar } from "@/components/(dashboard)/dashboard-sidebar";
import RoleGuard from "@/components/auth/role-guard";
import Header from "@/components/layout/public/Header";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["STUDENT"]}>
      <div>
        <Header />
        <DashboardShell role="STUDENT">{children}</DashboardShell>
      </div>
    </RoleGuard>
  );
};

export default layout;
