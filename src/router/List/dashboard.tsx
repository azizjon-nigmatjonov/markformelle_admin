import { lazy } from "react";

const Dashboard = lazy(() => import("../../views/Dashboard/Avto"));
const DashboardAnalytics = lazy(
  () => import("../../views/Dashboard/Analytics")
);

export const dashboardList = [
  {
    parent: "dashboard",
    link: "dashboard",
    sidebar: true,
    title: "dashboard_avto",
    icon: "zip",
    element: <Dashboard />,
  },
  {
    parent: "dashboard",
    link: "analytics",
    sidebar: true,
    title: "analytics",
    icon: "analytics",
    element: <DashboardAnalytics />,
  },
];
