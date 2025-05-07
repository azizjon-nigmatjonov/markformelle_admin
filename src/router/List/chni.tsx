import ChniDashboard from "../../views/Chni";

export const chniSection = [
  {
    parent: "chni",
    link: "dashboard",
    sidebar: true,
    title: "dashboard_chni",
    parent_icon: (
      <img width={20} src="/images/socks.png" alt="socks" loading="lazy" />
    ),
    icon: <img width={18} src="/images/socks.png" alt="socks" loading="lazy" />,
    element: <ChniDashboard />,
    auth: true,
    permissions: ["view_page", "edit"],
  },
];
