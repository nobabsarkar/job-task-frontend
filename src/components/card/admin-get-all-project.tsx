"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Filter,
  FolderGit2,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useAdminGetAllProject,
  useUpdateStudentProjectStatus,
} from "@/hooks/project.hook";

const PAGE_SIZE = 10;

export type ProjectQuery = {
  status: string;
  page: number;
  limit: number;
};

const AdminGetAllProject = () => {
  // Filter and pagination state
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  // Send updated parameters to the API
  const filters: ProjectQuery = {
    status: statusFilter === "ALL" ? "" : statusFilter,
    page: currentPage,
    limit: PAGE_SIZE,
  };

  const { data, isLoading, isError } = useAdminGetAllProject(filters);
  const projectData = data?.data?.data ?? [];

  // Adjust these paths if your backend uses a different response structure
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPage ?? meta?.totalPages ?? 1;
  const totalProjects = meta?.total ?? projectData.length;

  const { mutate: updateProjectStatus } = useUpdateStudentProjectStatus();

  const handleStatusChange = (id: string, status: "APPROVED" | "REJECTED") => {
    updateProjectStatus({
      id,
      payload: { status },
    });
  };

  const handleFilterChange = (value: string | null) => {
    setStatusFilter(value ?? "ALL");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400";

      case "REJECTED":
        return "border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400";

      // case "PENDING":
      // default:
      //   return "border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400";
    }
  };

  return (
    <div className="w-full min-w-0 space-y-5 p-3 sm:p-5 lg:p-6">
      <Card className="overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm">
        <CardHeader className="gap-5 border-b border-border/60 bg-muted/20 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FolderGit2 className="size-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold sm:text-xl">
                  All Student Projects
                </CardTitle>
                <CardDescription className="mt-1">
                  Review student submissions and manage project status.
                </CardDescription>
              </div>
            </div>

            <Badge
              variant="outline"
              className="w-fit rounded-full px-3 py-1.5 text-sm"
            >
              {totalProjects} Projects
            </Badge>
          </div>

          {/* Working status filter */}
          <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background/70 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                <Filter className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">Filter projects</p>
                <p className="text-xs text-muted-foreground">
                  View projects by approval status
                </p>
              </div>
            </div>

            <Select value={statusFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className="h-10 w-full rounded-lg border-border bg-background sm:w-[200px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All Projects</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="px-6">Project Name</TableHead>
                  <TableHead>Repository</TableHead>
                  <TableHead>Live Demo</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center">
                      <Loader2 className="mr-2 inline size-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Loading projects...
                      </span>
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-sm text-destructive"
                    >
                      Failed to load projects. Please try again.
                    </TableCell>
                  </TableRow>
                ) : projectData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-sm text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <FolderGit2 className="size-8 opacity-40" />
                        <p>No projects found.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  projectData.map((project: any) => (
                    <TableRow
                      key={project.id}
                      className="transition-colors hover:bg-muted/20"
                    >
                      <TableCell className="max-w-48 px-6 py-4 font-medium">
                        <p className="line-clamp-2">{project.projectName}</p>
                      </TableCell>

                      <TableCell className="min-w-48">
                        {project.repoUrl}
                      </TableCell>

                      <TableCell className="min-w-40">
                        {project.liveLink}
                      </TableCell>

                      <TableCell className="max-w-72">
                        <p className="line-clamp-2 min-w-40 text-sm leading-6 text-muted-foreground">
                          {project.description}
                        </p>
                      </TableCell>

                      <TableCell className="min-w-44 pr-6">
                        <Select
                          value={project.status}
                          onValueChange={(status) =>
                            handleStatusChange(
                              project.id,
                              status as "APPROVED" | "REJECTED",
                            )
                          }
                        >
                          <SelectTrigger
                            className={`h-9 w-36 rounded-lg font-medium transition-colors ${getStatusColor(project.status)}`}
                          >
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="APPROVED">Approved</SelectItem>
                            <SelectItem value="REJECTED">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Working pagination */}
        <div className="flex flex-col gap-4 border-t border-border/60 bg-muted/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm font-medium">Project submissions</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Page {currentPage} of {totalPages}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage <= 1 || isLoading}
              onClick={() => handlePageChange(currentPage - 1)}
              className="flex size-9 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  onClick={() => handlePageChange(page)}
                  className={`flex size-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-background hover:bg-muted"
                  }`}
                >
                  {page}
                </button>
              ),
            )}

            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage >= totalPages || isLoading}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex size-9 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminGetAllProject;
