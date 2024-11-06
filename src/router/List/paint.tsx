import PaintSection from "../../views/Paint";

export const paintSection = [
  {
    parent: "paint",
    link: "dashboard",
    sidebar: true,
    title: "Дашборд покраска",
    parent_icon: <img width={18} src="/images/paint.png" alt="warehouse" />,
    icon: <img width={18} src="/images/paint.png" alt="warehouse" />,
    element: <PaintSection />,
    auth: false,
  },
];
