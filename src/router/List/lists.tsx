import { MaterialsPage } from "../../views/Lists/Materials";
export const listSection = [
  {
    parent: "lists",
    link: "materials",
    sidebar: true,
    title: "hamstock",
    parent_icon: "/images/catalogue.png",
    icon: "/images/catalogue.png",
    element: <MaterialsPage />,
    auth: true,
    permissions: ["view_page"],
  },
];
