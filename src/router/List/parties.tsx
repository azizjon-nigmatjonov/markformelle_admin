import { PartyAsamalar } from "../../views/Parties/Orders";
import { PartiTanitimi } from "../../views/Parties/PartiTanitimi";
import { PartyProcess } from "../../views/Parties/PartyProcess";

export const partiesList = [
  {
    parent: "parties",
    link: "list",
    sidebar: true,
    title: "Parti Tanitimi",
    parent_icon: "/images/catalogue.png",
    icon: "/images/plus.png",
    element: <PartiTanitimi />,
    auth: true,
    permissions: ["view_page", "delete", "edit", "add"],
  },
  {
    parent: "parties",
    link: "transfers",
    sidebar: true,
    title: "Parti Asamalari",
    icon: "/images/documents.webp",
    element: <PartyAsamalar />,
    auth: true,
    permissions: ["view_page", "delete", "edit", "add"],
  },
  {
    parent: "parties",
    link: "process",
    sidebar: true,
    title: "Parti Harakatlari",
    icon: "/images/documents.webp",
    element: <PartyProcess />,
    auth: true,
    permissions: ["view_page", "delete", "edit", "add"],
  },
];
