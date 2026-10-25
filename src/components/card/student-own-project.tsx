"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FolderGit2 } from "lucide-react";
import { useGetMyProject } from "@/hooks/project.hook";

const StudentOwnProject = () => {
  const { data, isLoading } = useGetMyProject();
  const studentDatas = data?.data ?? [];

  const getStatusBadge = (status: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-transparent dark:text-green-400";

      case "REJECTED":
        return "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-transparent dark:text-red-400";

      default:
        return "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-transparent dark:text-amber-400";
    }
  };

  return (
    <div className="w-full min-w-0 p-3 sm:p-5 lg:p-6">
      <Card className="w-full  overflow-hidden rounded-xl border-border/60 bg-card shadow-sm">
        <CardHeader className="border-b border-border/60 bg-muted/20 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FolderGit2 className="size-5" />
            </div>

            <div>
              <CardTitle className="text-lg font-bold sm:text-xl">
                My Projects
              </CardTitle>
              <CardDescription className="mt-1">
                View your projects and submission status.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* <div className="w-full overflow-x-auto">
            <Table className=""> */}
          <div className="max-w-full overflow-x-auto">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="whitespace-nowrap px-4 sm:px-6">
                    Project Name
                  </TableHead>
                  <TableHead>Repo URL</TableHead>
                  <TableHead>Live Link</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="pr-4">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      Loading projects...
                    </TableCell>
                  </TableRow>
                ) : studentDatas.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No projects found.
                    </TableCell>
                  </TableRow>
                ) : (
                  studentDatas?.map((project: any) => (
                    <TableRow
                      key={project.id}
                      className="transition-colors hover:bg-muted/20"
                    >
                      <TableCell className="max-w-48 px-4 py-4 font-medium sm:px-6">
                        {project.projectName}
                      </TableCell>

                      <TableCell className="min-w-40">
                        {project.repoUrl}
                      </TableCell>

                      <TableCell className="min-w-40">
                        {project.liveLink}
                      </TableCell>

                      <TableCell className="max-w-64 text-sm text-muted-foreground">
                        <p className="line-clamp-2 min-w-40">
                          {project.description}
                        </p>
                      </TableCell>

                      <TableCell className="pr-4">
                        <Badge
                          variant="outline"
                          className={`whitespace-nowrap  rounded-full px-3 py-1  ${getStatusBadge(project.status)}`}
                        >
                          {project.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentOwnProject;
