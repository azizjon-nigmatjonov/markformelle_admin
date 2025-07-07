import { PartyOrders } from "../../views/Paint/Orders";

export const partiesList = [
  {
    parent: "parties",
    link: "parties",
    sidebar: true,
    title: "Parti",
    parent_icon: "/images/catalogue.png",
    icon: "/images/documents.webp",
    element: <PartyOrders />,
    auth: true,
    permissions: ["view_page", "delete", "edit", "add"],
  },
];
