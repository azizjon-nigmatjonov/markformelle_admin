import { lazy } from "react";

const Dashboard = lazy(() => import("../../views/Dashboard/Avto"));
const DashboardAnalytics = lazy(
  () => import("../../views/Dashboard/Analytics")
);

export const dashboardList = [
  {
    parent: "dashboard",
    link: "knitting_machines",
    sidebar: true,
    title: "dashboardavto",
    parent_icon: <img width={18} src="/images/kniting.png" alt="kniting" />,
    icon: "kniting",
    element: <Dashboard />,
    auth: false,
  },
  {
    parent: "dashboard",
    link: "analytics",
    sidebar: true,
    title: "dashboard_analytics",
    icon: "analytics",
    element: <DashboardAnalytics />,
    auth: false,
    children: [
      {
        parent: "dashboard",
        link: "analytics",
        childLink: "machines",
        path: "dashboard/analytics/machines",
        sidebar: true,
        title: "dashboard_analytics_machines",
        icon: "increasing",
        element: <DashboardAnalytics />,
        auth: false,
      },
    ],
  },
  {
    parent: "dashboard",
    link: "analytics",
    childLink: "machines",
    path: "dashboard/analytics/machines",
    sidebar: false,
    title: "dashboard_analytics_machines",
    icon: "increasing",
    element: <DashboardAnalytics />,
    auth: false,
  },
];
