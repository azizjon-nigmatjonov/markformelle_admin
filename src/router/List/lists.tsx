import { MaterialsPage } from "../../views/Lists/Materials";
import { ChemicalsListPage } from "../../views/Lists/Chemicals";
import { ArticulesPage } from "../../views/Lists/Articules";

export const listSection = [
  {
    parent: "lists",
    link: "materials",
    sidebar: true,
    title: "ham",
    parent_icon: "/images/catalogue.png",
    icon: "",
    element: <MaterialsPage />,
    auth: true,
    permissions: ["view_page"],
  },
  {
    parent: "lists",
    link: "chemicals",
    sidebar: true,
    title: "receteasama",
    parent_icon: "/images/catalogue.png",
    icon: "",
    element: <ChemicalsListPage />,
    auth: true,
    permissions: ["view_page"],
  },
  {
    parent: "lists",
    link: "articules",
    sidebar: true,
    title: "kalite",
    parent_icon: "/images/catalogue.png",
    icon: "",
    element: <ArticulesPage />,
    auth: true,
    permissions: ["view_page"],
  },
];
