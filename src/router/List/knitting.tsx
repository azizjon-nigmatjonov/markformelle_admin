import { AnalyticsPlan } from "../../views/Kniting/Statistics/Plan";
import KnittingMachines from "../../views/Kniting/Machines";
import KnittingProcess from "../../views/Kniting/Process";
import KnittingdAnalytics from "../../views/Kniting/Statistics/Machines";
import KnittingMachine from "../../views/Kniting/Machines/SinglePage";

export const knittingList = [
  {
    parent: "knitting",
    link: "machines",
    sidebar: true,
    title: "knittingavto",
    parent_icon: <img width={18} src="/images/kniting.png" alt="knitting" />,
    icon: "knitting",
    element: <KnittingMachines />,
    auth: false,
  },
  {
    parent: "knitting",
    link: "loaders",
    sidebar: true,
    title: "Дашборд грузчиков 614",
    icon: <img width={23} src="/images/fork-loader.png" alt="loader" />,
    element: <KnittingProcess />,
    auth: false,
  },
  {
    parent: "knitting",
    link: "analytics",
    sidebar: true,
    title: "knitting_analytics",
    icon: "analytics",
    element: <KnittingdAnalytics />,
    auth: false,
    children: [
      {
        parent: "knitting",
        link: "analytics",
        childLink: "machines",
        path: "knitting/analytics/machines",
        sidebar: true,
        title: "knitting_analytics_machines",
        icon: "increasing",
        element: <KnittingdAnalytics />,
        auth: false,
      },
      {
        parent: "knitting",
        link: "analytics",
        childLink: "plan",
        path: "knitting/analytics/plan",
        sidebar: false,
        title: "knitting_analytics_plan",
        icon: "list",
        element: <AnalyticsPlan />,
        auth: false,
      },
    ],
  },
  {
    parent: "knitting",
    link: "analytics",
    childLink: "machines",
    path: "knitting/analytics/machines",
    sidebar: false,
    title: "knitting_analytics_machines",
    icon: "increasing",
    element: <KnittingdAnalytics />,
    auth: false,
  },
  {
    parent: "knitting",
    link: "analytics",
    childLink: "plan",
    path: "knitting/analytics/plan",
    sidebar: false,
    title: "knitting_analytics_plan",
    icon: "list",
    element: <AnalyticsPlan />,
    auth: false,
  },
  {
    parent: "knitting",
    link: "machine/:id",
    sidebar: false,
    title: "knitting_machine",
    icon: "list",
    element: <KnittingMachine />,
    auth: false,
  },
];