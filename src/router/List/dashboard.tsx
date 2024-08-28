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
    icon: <img width={20} src="/images/kniting.png" alt="kniting" />,
    element: <Dashboard />,
    auth: false,
  },
  {
    parent: "dashboard",
    link: "analytics",
    sidebar: true,
    title: "dashboard_analytics",
    icon: <img width={20} src="/images/statistics.png" alt="statistics" />,
    element: <DashboardAnalytics />,
    auth: false,
  },
];
