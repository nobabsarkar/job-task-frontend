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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FolderGit2, Loader2, ExternalLink } from "lucide-react";
import { useAdminGetAllProject } from "@/hooks/project.hook";

const AdminGetAllProject = () => {
  const { data, isLoading, isError } = useAdminGetAllProject();
  const projectData = data?.data ?? [];
  console.log(projectData.data);

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

  const handleStatusChange = (projectId: string, status: string) => {
    // Connect your status update mutation here.
    console.log("Project ID:", projectId, "New status:", status);
  };

  return (
    <div className="w-full min-w-0 p-3 sm:p-5 lg:p-6">
      <Card className="w-full overflow-hidden rounded-xl border-border/60 bg-card shadow-sm">
        <CardHeader className="border-b border-border/60 bg-muted/20 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FolderGit2 className="size-5" />
            </div>

            <div>
              <CardTitle className="text-lg font-bold sm:text-xl">
                All Student Projects
              </CardTitle>
              <CardDescription className="mt-1">
                Review project submissions and manage their status.
              </CardDescription>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="outline" className="rounded-full px-3 py-1">
              Total Projects: {projectData.data?.length}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="max-w-full overflow-x-auto">
            <Table className="min-w-[1100px]">
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
                      <Loader2 className="mr-2 inline size-4 animate-spin" />
                      Loading projects...
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-destructive"
                    >
                      Failed to load projects. Please try again.
                    </TableCell>
                  </TableRow>
                ) : projectData.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No projects found.
                    </TableCell>
                  </TableRow>
                ) : (
                  projectData?.data?.map((project: any) => (
                    <TableRow
                      key={project.id}
                      className="transition-colors hover:bg-muted/20"
                    >
                      <TableCell className="max-w-48 px-4 py-4 font-medium sm:px-6">
                        {project.projectName}
                      </TableCell>

                      <TableCell className="min-w-48">
                        {project.repoUrl}
                      </TableCell>

                      <TableCell className="min-w-48">
                        {project.liveLink}
                      </TableCell>

                      <TableCell className="max-w-72 text-sm text-muted-foreground">
                        <p className="line-clamp-2 min-w-40">
                          {project.description}
                        </p>
                      </TableCell>

                      <TableCell className="min-w-44 pr-4">
                        <div className="flex flex-col items-start gap-2">
                          <Select
                            value={project.status}
                            onValueChange={(status) =>
                              handleStatusChange(project.id, status)
                            }
                          >
                            <SelectTrigger className="h-9 w-36">
                              <SelectValue placeholder="Change status" />
                            </SelectTrigger>

                            <SelectContent>
                              <SelectItem value="PENDING">Pending</SelectItem>
                              <SelectItem value="APPROVED">Approved</SelectItem>
                              <SelectItem value="REJECTED">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
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

export default AdminGetAllProject;
