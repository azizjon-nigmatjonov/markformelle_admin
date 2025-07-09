import { PartyOrders } from "../../views/Paint/Orders";

export const partiesList = [
  {
    parent: "parties",
    link: "list",
    sidebar: true,
    title: "Parti Tanitimi",
    parent_icon: "/images/catalogue.png",
    icon: "/images/documents.webp",
    element: <PartyOrders />,
    auth: true,
    permissions: ["view_page", "delete", "edit", "add"],
  },
  {
    parent: "parties",
    link: "transfers",
    sidebar: true,
    title: "Parti Asamalari",
    icon: "/images/documents.webp",
    element: <PartyOrders />,
    auth: true,
    permissions: ["view_page", "delete", "edit", "add"],
  },
  {
    parent: "parties",
    link: "process",
    sidebar: true,
    title: "Parti Harakatlari",
    icon: "/images/documents.webp",
    element: <PartyOrders />,
    auth: true,
    permissions: ["view_page", "delete", "edit", "add"],
  },
];
