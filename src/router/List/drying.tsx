import DryingPage from "../../views/Drying/Drying";

export const dryingList = [
  {
    parent: "drying",
    link: "drying",
    sidebar: true,
    title: "Сушилка",
    parent_icon: "/images/dry.webp",
    icon: "/images/dry.webp",
    element: <DryingPage />,
    auth: true,
    permissions: ["view_page"],
  },
];
