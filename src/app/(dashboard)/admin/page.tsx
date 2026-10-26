"use client";

import {
  Activity,
  CheckCircle2,
  Clock3,
  FolderKanban,
  XCircle,
} from "lucide-react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useProjectStatistics } from "@/hooks/project.hook";

type Project = {
  id: string;
  projectName: string;
  repoUrl: string;
  liveLink: string;
  description: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  studentId: string;
  createdAt: string;
  updatedAt: string;
};

const STATUS_COLORS = {
  APPROVED: "#10b981",
  PENDING: "#f59e0b",
  REJECTED: "#f43f5e",
};

const tooltipStyle = {
  borderRadius: "12px",
  border: "1px solid var(--border)",
  backgroundColor: "var(--card)",
  color: "var(--card-foreground)",
  fontSize: "12px",
};

export default function AdminPage() {
  const { data, isLoading, isError } = useProjectStatistics();

  // Supports API responses shaped as { data: [...] }
  // or { data: { data: [...] } }.
  const response = data?.data;
  const projects: Project[] = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
      ? response.data
      : [];

  const totalProjects = projects.length;

  const totalApproved = projects.filter(
    (project) => project.status === "APPROVED",
  ).length;

  const totalPending = projects.filter(
    (project) => project.status === "PENDING",
  ).length;

  const totalRejected = projects.filter(
    (project) => project.status === "REJECTED",
  ).length;

  const approvalRate =
    totalProjects > 0 ? Math.round((totalApproved / totalProjects) * 100) : 0;

  const statusData = [
    {
      name: "Approved",
      value: totalApproved,
      color: STATUS_COLORS.APPROVED,
    },
    {
      name: "Pending",
      value: totalPending,
      color: STATUS_COLORS.PENDING,
    },
    {
      name: "Rejected",
      value: totalRejected,
      color: STATUS_COLORS.REJECTED,
    },
  ];

  // Derive submission counts from actual project creation dates.
  const monthlyData = Object.values(
    projects.reduce<
      Record<string, { month: string; submitted: number; approved: number }>
    >((acc, project) => {
      const date = new Date(project.createdAt);

      if (Number.isNaN(date.getTime())) return acc;

      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0",
      )}`;

      if (!acc[key]) {
        acc[key] = {
          month: date.toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
          }),
          submitted: 0,
          approved: 0,
        };
      }

      acc[key].submitted += 1;

      if (project.status === "APPROVED") {
        acc[key].approved += 1;
      }

      return acc;
    }, {}),
  )
    .sort((a, b) => {
      // Sort using the year-month key from the formatted date.
      const parseMonth = (month: string) => new Date(`01 ${month}`).getTime();

      return parseMonth(a.month) - parseMonth(b.month);
    })
    .slice(-6);

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Loading project statistics...
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-6">
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
          <h2 className="font-semibold text-destructive">
            Failed to load projects
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Please try again later or check your API response.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen space-y-6 bg-background p-4 text-foreground sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Dashboard / Overview
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Project Statistics
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Monitor student submissions, approval progress, and project review
            activity.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm text-muted-foreground shadow-sm">
          <Activity className="size-4 text-emerald-500" />
          Project Overview
        </div>
      </div>

      {/* Statistics cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={totalProjects}
          description="All project submissions"
          icon={<FolderKanban className="size-5" />}
          iconClass="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />

        <StatCard
          title="Pending Review"
          value={totalPending}
          description="Awaiting mentor review"
          icon={<Clock3 className="size-5" />}
          iconClass="bg-amber-500/10 text-amber-600 dark:text-amber-400"
        />

        <StatCard
          title="Approved"
          value={totalApproved}
          description="Successfully approved"
          icon={<CheckCircle2 className="size-5" />}
          iconClass="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
        />

        <StatCard
          title="Rejected"
          value={totalRejected}
          description="Projects not approved"
          icon={<XCircle className="size-5" />}
          iconClass="bg-rose-500/10 text-rose-600 dark:text-rose-400"
        />
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Submission activity */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6 xl:col-span-2">
          <div className="mb-6">
            <h2 className="text-base font-semibold sm:text-lg">
              Submission Activity
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Monthly submissions and current approved status
            </p>
          </div>

          <div className="h-[280px] w-full sm:h-[320px]">
            {monthlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 8, right: 4, left: -20, bottom: 0 }}
                  barGap={6}
                >
                  <CartesianGrid
                    stroke="currentColor"
                    strokeOpacity={0.1}
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: "var(--muted-foreground)",
                      fontSize: 12,
                    }}
                  />

                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    tick={{
                      fill: "var(--muted-foreground)",
                      fontSize: 12,
                    }}
                  />

                  <Tooltip contentStyle={tooltipStyle} />

                  <Bar
                    dataKey="submitted"
                    name="Submitted"
                    fill="#6366f1"
                    radius={[5, 5, 0, 0]}
                    maxBarSize={32}
                  />

                  <Bar
                    dataKey="approved"
                    name="Approved"
                    fill="#10b981"
                    radius={[5, 5, 0, 0]}
                    maxBarSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChart message="No project submissions available yet." />
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="size-2.5 rounded-sm bg-indigo-500" />
              Submitted
            </span>

            <span className="flex items-center gap-2">
              <span className="size-2.5 rounded-sm bg-emerald-500" />
              Approved
            </span>
          </div>
        </div>

        {/* Project status distribution */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
          <div>
            <h2 className="text-base font-semibold sm:text-lg">
              Project Distribution
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Breakdown by review status
            </p>
          </div>

          <div className="relative mt-2 h-[230px] w-full">
            {totalProjects > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData.filter((item) => item.value > 0)}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={64}
                      outerRadius={88}
                      paddingAngle={4}
                      stroke="none"
                    >
                      {statusData
                        .filter((item) => item.value > 0)
                        .map((item) => (
                          <Cell key={item.name} fill={item.color} />
                        ))}
                    </Pie>

                    <Tooltip contentStyle={tooltipStyle} />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{totalProjects}</span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    Total Projects
                  </span>
                </div>
              </>
            ) : (
              <EmptyChart message="No projects to display." />
            )}
          </div>

          <div className="mt-2 space-y-4">
            {statusData.map((item) => {
              const percentage =
                totalProjects > 0
                  ? Math.round((item.value / totalProjects) * 100)
                  : 0;

              return (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.name}
                    </span>

                    <span className="font-semibold">
                      {item.value}{" "}
                      <span className="font-normal text-muted-foreground">
                        ({percentage}%)
                      </span>
                    </span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approval overview */}
      <section className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Approval Overview
            </p>

            <h2 className="mt-1 text-xl font-bold">
              {approvalRate}% approval rate
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {totalApproved} of {totalProjects} projects are currently
              approved.
            </p>
          </div>

          <div
            className="h-3 w-full overflow-hidden rounded-full bg-muted sm:max-w-xs"
            role="progressbar"
            aria-valuenow={approvalRate}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${approvalRate}%` }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
  iconClass,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
        </div>

        <div
          className={`flex size-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
      {message}
    </div>
  );
}
