import { EritmaPage } from "../../views/Stores/Eritma";

export const chemicalStore = [
  {
    parent: "chemical_store",
    link: "list",
    sidebar: true,
    title: "Справочники",
    parent_icon: <img width={20} src="/images/store.png" alt="store" />,
    icon: <img width={20} src="/images/rope.png" alt="rope" />,
    element: <EritmaPage />,
    auth: true,
    permissions: ["view_page"],
    children: [
      {
        parent: "chemical_store/list",
        link: "chemicals",
        title: "Химикаты",
        childLink: "chemicals",
      },
    ],
  },
];
