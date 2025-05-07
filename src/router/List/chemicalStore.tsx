import { BuyingChemicals } from "../../views/Stores/Buying";
import { ChemicalsStock } from "../../views/Stores/ChemicalsStock";
import { CreateMixture } from "../../views/Stores/CreateMixture";
import { EritmaPage } from "../../views/Stores/Eritma";
import { MixturesPage } from "../../views/Stores/Mixtures";
import { Transfers } from "../../views/Stores/Transfers";

export const chemicalStore = [
  {
    parent: "chemical_store",
    link: "list",
    sidebar: true,
    title: "catalogies",
    parent_icon: (
      <img width={20} src="/images/store_chemical.png" alt="store" />
    ),
    icon: <img width={20} src="/images/catalogue.webp" alt="catalogue" />,
    element: "",
    auth: true,
    permissions: ["view_page"],
    children: [
      {
        parent: "chemical_store/list",
        link: "chemicals",
        title: "chemicals",
        childLink: "chemicals",
        path: "chemical_store/chemicals",
        icon: <img width={20} src="/images/chemical.png" alt="chemical" />,
      },
      {
        parent: "chemical_store/mixtures",
        link: "mixtures",
        title: "chemicals_mixtures",
        childLink: "mixtures",
        path: "chemical_store/mixtures",
        icon: <img width={20} src="/images/mixtures.png" alt="mixtures" />,
      },
      {
        parent: "chemical_store/mixture_create",
        link: "mixture_create",
        title: "chemicals_mixture_create",
        childLink: "mixture_create",
        path: "chemical_store/mixture_create",
        icon: <img width={20} src="/images/create.png" alt="mixture_create" />,
      },
    ],
  },
  {
    parent: "chemical_store",
    link: "documents",
    sidebar: true,
    title: "Документы",
    icon: <img width={20} src="/images/documents.png" alt="documents" />,
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
        icon: <img width={20} src="/images/transfers.png" alt="transfers" />,
      },
      {
        parent: "chemical_store/list",
        link: "buying",
        title: "Документ покупки",
        childLink: "buying",
        path: "chemical_store/buying",
        icon: <img width={20} src="/images/store.png" alt="store" />,
      },
    ],
  },
  {
    parent: "chemical_store",
    link: "reports",
    sidebar: true,
    title: "Отчёты",
    icon: <img width={20} src="/images/report.png" alt="report" />,
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
        icon: <img width={20} src="/images/chemical.png" alt="chemical" />,
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
    link: "mixtures",
    sidebar: false,
    element: <MixturesPage />,
    permissions: ["view_page"],
  },
  {
    parent: "chemical_store",
    link: "mixture_create",
    sidebar: false,
    element: <CreateMixture />,
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
    link: "buying",
    sidebar: false,
    element: <BuyingChemicals />,
    permissions: ["view_page"],
  },
  {
    parent: "chemical_store",
    link: "chemical_stock",
    sidebar: false,
    element: <ChemicalsStock />,
  },
];
