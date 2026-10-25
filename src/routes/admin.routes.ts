const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Admin Dashboard",
    items: [
      {
        title: "Home",
        url: `${prefix}`,
      },
      {
        title: "Manage Users",
        url: `${prefix}/manage-users`,
      },
      {
        title: "Student Project",
        url: `${prefix}/student-project`,
      },
    ],
  },
];
