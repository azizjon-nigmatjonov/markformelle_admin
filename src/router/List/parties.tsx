import { OrdersProcess } from "../../views/Parties/Orders";
import { PartiTanitimi } from "../../views/Parties/PartiTanitimi";

export const partiesList = [
  {
    parent: "parties",
    link: "list",
    sidebar: true,
    title: "Parti Tanitimi",
    parent_icon: "/images/catalogue.png",
    icon: "/images/catalogue.png",
    element: <PartiTanitimi />,
    auth: true,
    permissions: ["view_page", "delete", "edit", "add"],
  },
  {
    parent: "parties",
    link: "proceses",
    sidebar: true,
    title: "Parti asamalari",
    icon: "/images/documents.webp",
    element: <OrdersProcess />,
    auth: true,
    permissions: ["view_page", "delete", "edit", "add"],
  },
  // {
  //   parent: "parties",
  //   link: "process",
  //   sidebar: true,
  //   title: "Parti Harakatlari",
  //   icon: "/images/documents.webp",
  //   element: <PartyProcess />,
  //   auth: true,
  //   permissions: ["view_page", "delete", "edit", "add"],
  // },
];
