// "use client";

// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { FolderGit2, Loader2, ExternalLink } from "lucide-react";
// import {
//   useAdminGetAllProject,
//   useUpdateStudentProjectStatus,
// } from "@/hooks/project.hook";

// const AdminGetAllProject = () => {
//   const { data, isLoading, isError } = useAdminGetAllProject();
//   const projectData = data?.data ?? [];

//   const { mutate: updateProjectStatus } = useUpdateStudentProjectStatus();

//   const handleStatusChange = (id: string, status: "APPROVED" | "REJECTED") => {
//     updateProjectStatus({
//       id,
//       payload: {
//         status,
//       },
//     });
//   };

//   return (
//     <div className="w-full min-w-0 p-3 sm:p-5 lg:p-6">
//       <Card className="w-full overflow-hidden rounded-xl border-border/60 bg-card shadow-sm">
//         <CardHeader className="border-b border-border/60 bg-muted/20 p-4 sm:p-6">
//           <div className="flex items-center gap-3">
//             <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
//               <FolderGit2 className="size-5" />
//             </div>

//             <div>
//               <CardTitle className="text-lg font-bold sm:text-xl">
//                 All Student Projects
//               </CardTitle>
//               <CardDescription className="mt-1">
//                 Review project submissions and manage their status.
//               </CardDescription>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-2 pt-2">
//             <Badge variant="outline" className="rounded-full px-3 py-1">
//               Total Projects: {projectData.data?.length}
//             </Badge>
//           </div>
//         </CardHeader>

//         <CardContent className="p-0">
//           <div className="max-w-full overflow-x-auto">
//             <Table className="min-w-[1100px]">
//               <TableHeader>
//                 <TableRow className="bg-muted/30 hover:bg-muted/30">
//                   <TableHead className="whitespace-nowrap px-4 sm:px-6">
//                     Project Name
//                   </TableHead>
//                   <TableHead>Repo URL</TableHead>
//                   <TableHead>Live Link</TableHead>
//                   <TableHead>Description</TableHead>
//                   <TableHead className="pr-4">Status</TableHead>
//                 </TableRow>
//               </TableHeader>

//               <TableBody>
//                 {isLoading ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={5}
//                       className="h-24 text-center text-muted-foreground"
//                     >
//                       <Loader2 className="mr-2 inline size-4 animate-spin" />
//                       Loading projects...
//                     </TableCell>
//                   </TableRow>
//                 ) : isError ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={5}
//                       className="h-24 text-center text-destructive"
//                     >
//                       Failed to load projects. Please try again.
//                     </TableCell>
//                   </TableRow>
//                 ) : projectData.length === 0 ? (
//                   <TableRow>
//                     <TableCell
//                       colSpan={5}
//                       className="h-24 text-center text-muted-foreground"
//                     >
//                       No projects found.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   projectData?.data?.map((project: any) => (
//                     <TableRow
//                       key={project.id}
//                       className="transition-colors hover:bg-muted/20"
//                     >
//                       <TableCell className="max-w-48 px-4 py-4 font-medium sm:px-6">
//                         {project.projectName}
//                       </TableCell>

//                       <TableCell className="min-w-48">
//                         {project.repoUrl}
//                       </TableCell>

//                       <TableCell className="min-w-48">
//                         {project.liveLink}
//                       </TableCell>

//                       <TableCell className="max-w-72 text-sm text-muted-foreground">
//                         <p className="line-clamp-2 min-w-40">
//                           {project.description}
//                         </p>
//                       </TableCell>

//                       <TableCell className="min-w-44 pr-4">
//                         <div className="flex flex-col items-start gap-2">
//                           <Select
//                             value={project.status}
//                             onValueChange={(status) =>
//                               handleStatusChange(project.id, status)
//                             }
//                           >
//                             <SelectTrigger className="h-9 w-36">
//                               <SelectValue placeholder="Change status" />
//                             </SelectTrigger>

//                             <SelectContent>
//                               <SelectItem value="PENDING">Pending</SelectItem>
//                               <SelectItem value="APPROVED">Approved</SelectItem>
//                               <SelectItem value="REJECTED">Rejected</SelectItem>
//                             </SelectContent>
//                           </Select>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default AdminGetAllProject;

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
import {
  FolderGit2,
  Loader2,
  ExternalLink,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  useAdminGetAllProject,
  useUpdateStudentProjectStatus,
} from "@/hooks/project.hook";

const AdminGetAllProject = () => {
  const { data, isLoading, isError } = useAdminGetAllProject();
  const projectData = data?.data?.data ?? [];
  const { mutate: updateProjectStatus } = useUpdateStudentProjectStatus();

  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const handleStatusChange = (id: string, status: "APPROVED" | "REJECTED") => {
    updateProjectStatus({
      id,
      payload: { status },
    });
  };

  // UI-only demo controls; these do not change your API request.
  const filteredProjects =
    statusFilter === "ALL"
      ? projectData
      : projectData.filter((project: any) => project.status === statusFilter);

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const visibleProjects = filteredProjects?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

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
                  Review submissions and manage project status.
                </CardDescription>
              </div>
            </div>

            <Badge
              variant="outline"
              className="w-fit rounded-full px-3 py-1.5 text-sm"
            >
              {filteredProjects.length} Projects
            </Badge>
          </div>

          {/* Status filter design */}
          <div className="flex flex-col gap-3 rounded-xl border border-border/60 bg-background/70 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
                <Filter className="size-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold">Filter projects</p>
                <p className="text-xs text-muted-foreground">
                  View submissions by approval status
                </p>
              </div>
            </div>

            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value || "");
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-10 w-full rounded-lg border-border bg-background sm:w-48">
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
          <div className="max-w-full overflow-x-auto">
            <Table className="min-w-[1000px]">
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="px-6">Project Name</TableHead>
                  <TableHead>Repo URL</TableHead>
                  <TableHead>Live Link</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="pr-6">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
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
                ) : visibleProjects.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-28 text-center text-muted-foreground"
                    >
                      No projects found.
                    </TableCell>
                  </TableRow>
                ) : (
                  visibleProjects.map((project: any) => (
                    <TableRow
                      key={project.id}
                      className="transition-colors hover:bg-muted/20"
                    >
                      <TableCell className="max-w-48 px-6 py-4 font-medium">
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
                          <SelectTrigger className="h-9 w-36 rounded-lg">
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

        {/* Pagination design */}
        <div className="flex flex-col gap-4 border-t border-border/60 bg-muted/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {filteredProjects.length === 0
                ? 0
                : (currentPage - 1) * pageSize + 1}
            </span>
            {"–"}
            <span className="font-semibold text-foreground">
              {Math.min(currentPage * pageSize, filteredProjects.length)}
            </span>
            {" of "}
            <span className="font-semibold text-foreground">
              {filteredProjects.length}
            </span>{" "}
            projects
          </p>

          <div className="flex items-center justify-between gap-2 sm:justify-end">
            <span className="mr-2 text-xs text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>

            <button
              type="button"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
              className="flex size-9 items-center justify-center rounded-lg border border-border bg-background transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1,
              )
              .map((page, index, pages) => (
                <span key={page} className="contents">
                  {index > 0 && pages[index - 1] !== page - 1 && (
                    <span className="px-1 text-muted-foreground">…</span>
                  )}
                  <button
                    type="button"
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                    onClick={() => setCurrentPage(page)}
                    className={`size-9 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "border border-border bg-background hover:bg-muted"
                    }`}
                  >
                    {page}
                  </button>
                </span>
              ))}

            <button
              type="button"
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
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
