/** biome-ignore-all lint/a11y/useValidAriaRole: <explanation> */
import DashboardShell from "@/components/(dashboard)/dashboard-shell";
import RoleGuard from "@/components/auth/role-guard";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <RoleGuard roles={["SUPER_ADMIN"]}>
      <DashboardShell role="SUPER_ADMIN">{children}</DashboardShell>
    </RoleGuard>
  );
};

export default layout;
