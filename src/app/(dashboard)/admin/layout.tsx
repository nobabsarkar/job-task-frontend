/** biome-ignore-all lint/a11y/useValidAriaRole: <explanation> */
import DashboardShell from "@/components/(dashboard)/dashboard-shell";
import RoleGuard from "@/components/auth/role-guard";
import Header from "@/components/layout/public/Header";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["SUPER_ADMIN"]}>
      <div>
        <Header />
        <DashboardShell role="SUPER_ADMIN">{children}</DashboardShell>
      </div>
    </RoleGuard>
  );
};

export default layout;
