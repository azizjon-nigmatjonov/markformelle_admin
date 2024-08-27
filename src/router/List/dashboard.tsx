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
    icon: "zip",
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
  },
];
