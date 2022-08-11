export default [
  {
    icon: "mdi-home-edit-outline",
    title: "sidebar.items_definition",
    children: [
      {
        icon: "mdi-home-edit-outline",
        title: "sidebar.items.index",
        to: `items`,
      },
      {
        icon: "mdi-home-edit-outline",
        title: "sidebar.items.create",
        to: `items-create`,
      },
    ],
  },
  {
    icon: "mdi-graph-outline",
    title: "sidebar.categories",
    children: [
      {
        icon: "mdi-eye-outline",
        title: "sidebar.view",
        to: `categories-create`,
      },
    ],
  },
  {
    icon: "mdi-home-edit-outline",
    title: "sidebar.halls",
    children: [
      {
        icon: "mdi-home-edit-outline",
        title: "sidebar.halls.index",
        to: `halls`,
      },
      {
        icon: "mdi-home-edit-outline",
        title: "sidebar.halls.create",
        to: `halls-create`,
      },
    ],
  },
  {
    icon: "mdi-home-edit-outline",
    title: "sidebar.globals",
    children: [
      {
        icon: "mdi-home-edit-outline",
        title: "sidebar.globals.settings",
        to: `globals-settings`,
      },
    ],
  },
];
