import DryingPage from "../../views/Drying/Drying";

export const dryingList = [
  {
    parent: "drying",
    link: "drying",
    sidebar: true,
    title: "Сушилка",
    parent_icon: (
      <img width={20} src="/images/dry.webp" alt="drying" loading="lazy" />
    ),
    icon: <img width={18} src="/images/dry.webp" alt="drying" loading="lazy" />,
    element: <DryingPage />,
    auth: true,
    permissions: ["view_page"],
  },
];
