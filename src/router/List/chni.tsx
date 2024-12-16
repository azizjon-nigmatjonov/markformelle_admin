import ChniDashboard from "../../views/Chni";

export const chniSection = [
  {
    parent: "chni",
    link: "list",
    sidebar: true,
    title: "Дашборд ЧНИ",
    parent_icon: <img width={18} src="/images/weaving.png" alt="weaving" />,
    icon: <img width={18} src="/images/weaving.png" alt="weaving" />,
    element: <ChniDashboard />,
    auth: false,
  },
];
