"use client";

import { useEffect, useState } from "react";
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
import { Users, Mail } from "lucide-react";
import { useAdminGetAllUser } from "@/hooks/user.hook";
import { User, UserRole } from "@/types/user.type";

export default function AllUsersTable() {
  const { data } = useAdminGetAllUser();
  const [users, setUsers] = useState<User[]>([]);

  const updateLocalRole = (userId: string, role: UserRole) => {
    setUsers((previous) =>
      previous?.map((user) => (user?.id === userId ? { ...user, role } : user)),
    );
  };

  useEffect(() => {
    if (data?.data) {
      setUsers(data.data);
    }
  }, [data]);

  const mentorCount = users.filter((user) => user.role === "MENTOR").length;

  const students = users.filter((user) => user.role === "STUDENT").length;

  const roleBadgeClass = (role: UserRole) => {
    switch (role) {
      case "SUPER_ADMIN":
        return "border-transparent bg-violet-600 text-white dark:bg-violet-500 dark:text-white";

      case "MENTOR":
        return "border-transparent bg-blue-600 text-white dark:bg-blue-500 dark:text-white";

      case "STUDENT":
        return "border-transparent bg-emerald-600 text-white dark:bg-emerald-500 dark:text-white";

      default:
        return "border-transparent bg-slate-600 text-white";
    }
  };

  return (
    <Card className="w-full overflow-hidden rounded-2xl border-border/60 bg-card shadow-sm m-10">
      <CardHeader className="border-b border-border/60 bg-muted/20 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="size-6" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">All Users</CardTitle>
            <CardDescription className="mt-1">
              View users and change their roles locally.
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-auto rounded-full">
            {data?.data.length} Users
          </Badge>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-300  bg-background p-4">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="mt-1 text-2xl font-bold">{data?.data?.length}</p>
          </div>
          <div className="rounded-xl border border-gray-300  bg-background p-4">
            <p className="text-sm text-muted-foreground">Mentors</p>
            <p className="mt-1 text-2xl font-bold">{mentorCount}</p>
          </div>
          <div className="rounded-xl border border-gray-300  bg-background p-4">
            <p className="text-sm text-muted-foreground">Students</p>
            <p className="mt-1 text-2xl font-bold">{students}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30 ">
                <TableHead className="px-5">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead className="pr-5">Change Role</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.map((user: any) => (
                <TableRow key={user.id} className="hover:bg-muted/30 border-0">
                  <TableCell className="px-5 py-4 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                        {user.name
                          .split(" ")
                          .map((part: any) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                      {user.name}
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="size-4 shrink-0" />
                      {user.email}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-md px-3 py-1 text-xs font-semibold tracking-wide shadow-sm ${roleBadgeClass(user.role)}`}
                    >
                      {user.role.replaceAll("_", " ")}
                    </Badge>
                  </TableCell>

                  <TableCell className="pr-5">
                    <Select
                      value={user.role}
                      disabled={user.role === "SUPER_ADMIN"}
                      onValueChange={(value) =>
                        updateLocalRole(user.id, value as UserRole)
                      }
                    >
                      <SelectTrigger
                        className={`w-[170px] bg-background ${
                          user.role === "SUPER_ADMIN"
                            ? "cursor-not-allowed opacity-60"
                            : "cursor-pointer"
                        }`}
                      >
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="STUDENT">Student</SelectItem>
                        <SelectItem value="MENTOR">Mentor</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
