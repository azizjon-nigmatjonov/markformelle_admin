import { LabChemicals } from "../../views/Labaratory/Chemicals";

export const labaratorySection = [
  {
    parent: "labaratory",
    link: "list",
    sidebar: true,
    title: "labaratory",
    parent_icon: "/images/chemical.webp",
    icon: "/images/addchemical.webp",
    element: <LabChemicals />,
    auth: true,
    permissions: ["view_page", "edit"],
  },
];
