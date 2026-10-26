"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useGetMyProject } from "@/hooks/project.hook";
import {
  Clock,
  CheckCircle2,
  XCircle,
  FolderGit2,
  ArrowUpRight,
} from "lucide-react";

// const projectStats = [
//   {
//     title: "Pending Review",
//     value: "04",
//     description: "Projects waiting for review",
//     icon: Clock,
//     color: "text-amber-600 dark:text-amber-400",
//     bg: "bg-amber-100 dark:bg-amber-400/10",
//   },
//   {
//     title: "Approved Projects",
//     value: "08",
//     description: "Projects successfully approved",
//     icon: CheckCircle2,
//     color: "text-emerald-600 dark:text-emerald-400",
//     bg: "bg-emerald-100 dark:bg-emerald-400/10",
//   },
//   {
//     title: "Rejected Projects",
//     value: "02",
//     description: "Projects needing improvement",
//     icon: XCircle,
//     color: "text-rose-600 dark:text-rose-400",
//     bg: "bg-rose-100 dark:bg-rose-400/10",
//   },
// ];

const StudentPage = () => {
  const { data } = useGetMyProject();
  const studentData = data?.data ?? [];

  const pendingProjects = studentData.filter(
    (project: { status: string }) => project.status === "PENDING",
  );

  const approvedProjects = studentData.filter(
    (project: { status: string }) => project.status === "APPROVED",
  );

  const rejectedProjects = studentData.filter(
    (project: { status: string }) => project.status === "REJECTED",
  );

  const projectStats = [
    {
      title: "Pending Review",
      value: pendingProjects.length,
      description: "Projects waiting for review",
      icon: Clock,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-400/10",
    },
    {
      title: "Approved Projects",
      value: approvedProjects.length,
      description: "Projects successfully approved",
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-100 dark:bg-emerald-400/10",
    },
    {
      title: "Rejected Projects",
      value: rejectedProjects.length,
      description: "Projects needing improvement",
      icon: XCircle,
      color: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-100 dark:bg-rose-400/10",
    },
  ];

  return (
    <div className="min-h-screen space-y-8 bg-background p-4 text-foreground sm:p-6 lg:p-8">
      {/* Welcome Section */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <FolderGit2 className="size-4" />
          Student Workspace
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome to Your Dashboard
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Track your project submissions, monitor review progress, and keep
          moving forward on your learning journey. Your next opportunity to
          improve starts here.
        </p>
      </section>

      {/* Project Statistics */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Project Overview
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A quick summary of your project review status.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projectStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card
                key={stat.title}
                className="group border-border/70 bg-card shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex size-12 items-center justify-center rounded-xl ${stat.bg}`}
                    >
                      <Icon className={`size-6 ${stat.color}`} />
                    </div>

                    <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>

                  <div className="mt-5 space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>

                    <p className="text-3xl font-bold tracking-tight">
                      {stat.value}
                    </p>

                    <p className="pt-1 text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Helpful Information */}
      <section className="rounded-2xl border border-border/70 bg-muted/40 p-5 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FolderGit2 className="size-5" />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">
              Keep Building, Keep Growing
            </h2>

            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
              Submit your projects with a clear description, a valid GitHub
              repository, and a working live demo. Mentors will review your
              submissions and provide a decision. If a project is rejected,
              review the feedback, make the necessary improvements, and submit
              your work again when appropriate.
            </p>

            <p className="text-sm font-medium text-foreground">
              Your progress reflects your commitment to learning and growth.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentPage;
