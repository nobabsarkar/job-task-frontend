export type UserRole = "SUPER_ADMIN" | "MENTOR" | "STUDENT";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
