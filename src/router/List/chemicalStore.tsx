import { ChemicalsStock } from "../../views/Stores/ChemicalsStock";
import { EritmaPage } from "../../views/Stores/Eritma";
import { Transfers } from "../../views/Stores/Transfers";

export const chemicalStore = [
  {
    parent: "chemical_store",
    link: "list",
    sidebar: true,
    title: "Справочники",
    parent_icon: <img width={20} src="/images/store.png" alt="store" />,
    icon: "",
    element: "",
    auth: true,
    permissions: ["view_page"],
    children: [
      {
        parent: "chemical_store/list",
        link: "chemicals",
        title: "Химикаты",
        childLink: "chemicals",
        path: "chemical_store/chemicals",
        icon: "",
      },
    ],
  },
  {
    parent: "chemical_store",
    link: "documents",
    sidebar: true,
    title: "Документы",
    icon: "",
    element: "",
    auth: true,
    permissions: ["view_page"],
    children: [
      {
        parent: "chemical_store/list",
        link: "transfers",
        title: "Внутреннее примешенные",
        childLink: "transfers",
        path: "chemical_store/transfers",
        icon: "",
      },
    ],
  },
  {
    parent: "chemical_store",
    link: "reports",
    sidebar: true,
    title: "Отчёты",
    icon: "",
    element: "",
    auth: true,
    permissions: ["view_page"],
    children: [
      {
        parent: "chemical_store/list",
        link: "chemical_stock",
        title: "Остатки химикатов",
        childLink: "chemical_stock",
        path: "chemical_store/chemical_stock",
        icon: "",
      },
    ],
  },
  {
    parent: "chemical_store",
    link: "chemicals",
    sidebar: false,
    element: <EritmaPage />,
    permissions: ["view_page"],
  },
  {
    parent: "chemical_store",
    link: "transfers",
    sidebar: false,
    element: <Transfers />,
    permissions: ["view_page"],
  },
  {
    parent: "chemical_store",
    link: "chemical_stock",
    sidebar: false,
    element: <ChemicalsStock />,
  },
];
