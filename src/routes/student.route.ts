const prefix = "/student";

export const studentRoutes = [
  {
    title: "Student Dashboard",
    items: [
      {
        title: "Home",
        url: `${prefix}`,
      },
      {
        title: "Create Project",
        url: `${prefix}/create-project`,
      },
      {
        title: "My Projects",
        url: `${prefix}/my-projects`,
      },
    ],
  },
];
