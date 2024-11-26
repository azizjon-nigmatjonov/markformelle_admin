import PaintSection from "../../views/Paint";

export const paintSection = [
  {
    parent: "paint",
    link: "dashboard",
    sidebar: true,
    title: "Дашборд покраски",
    parent_icon: (
      <img width={20} src="/images/paint.png" alt="warehouse paint" />
    ),
    icon: <img width={18} src="/images/paint.png" alt="warehouse" />,
    element: <PaintSection />,
    auth: false,
  },
];
