import { lazy } from "react";
import { AnalyticsPlan } from "../../views/Kniting/Statistics/Plan";

const KnitingMachines = lazy(() => import("../../views/Kniting/Machines"));
const KnitingdAnalytics = lazy(() => import("../../views/Kniting/Statistics/Machines"));
const KnitingMachine = lazy(
  () => import("../../views/Kniting/Machines/SinglePage")
);

export const knitingList = [
  {
    parent: "kniting",
    link: "knitting_machines",
    sidebar: true,
    title: "knitingavto",
    parent_icon: <img width={18} src="/images/kniting.png" alt="kniting" />,
    icon: "kniting",
    element: <KnitingMachines />,
    auth: false,
  },
  {
    parent: "kniting",
    link: "analytics",
    sidebar: true,
    title: "kniting_analytics",
    icon: "analytics",
    element: <KnitingdAnalytics />,
    auth: false,
    children: [
      {
        parent: "kniting",
        link: "analytics",
        childLink: "machines",
        path: "kniting/analytics/machines",
        sidebar: true,
        title: "kniting_analytics_machines",
        icon: "increasing",
        element: <KnitingdAnalytics />,
        auth: false,
      },
      {
        parent: "kniting",
        link: "analytics",
        childLink: "plan",
        path: "kniting/analytics/plan",
        sidebar: false,
        title: "kniting_analytics_plan",
        icon: "list",
        element: <AnalyticsPlan />,
        auth: false,
      },
    ],
  },
  {
    parent: "kniting",
    link: "analytics",
    childLink: "machines",
    path: "kniting/analytics/machines",
    sidebar: false,
    title: "kniting_analytics_machines",
    icon: "increasing",
    element: <KnitingdAnalytics />,
    auth: false,
  },
  {
    parent: "kniting",
    link: "analytics",
    childLink: "plan",
    path: "kniting/analytics/plan",
    sidebar: false,
    title: "kniting_analytics_plan",
    icon: "list",
    element: <AnalyticsPlan />,
    auth: false,
  },
  {
    parent: "kniting",
    link: "machine/:id",
    sidebar: false,
    title: "kniting_machine",
    icon: "list",
    element: <KnitingMachine />,
    auth: false,
  },
];