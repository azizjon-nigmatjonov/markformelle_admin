import ChniDashboard from "../../views/Chni";

export const chniSection = [
  {
    parent: "chni",
    link: "dashboard",
    sidebar: true,
    title: "dashboard_chni",
    parent_icon: "/images/socks.png",
    icon: "/images/socks.png",
    element: <ChniDashboard />,
    auth: true,
    permissions: ["view_page", "edit"],
  },
];
