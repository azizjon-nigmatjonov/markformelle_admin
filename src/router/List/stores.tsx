import { EritmaPage } from "../../views/Stores/Eritma";

export const stores = [
  {
    parent: "stores",
    link: "eritma",
    sidebar: true,
    title: "Eritma",
    parent_icon: <img width={20} src="/images/store.png" alt="store" />,
    icon: <img width={20} src="/images/rope.png" alt="rope" />,
    element: <EritmaPage />,
    auth: true,
    permissions: ["view_page"],
  },
];
