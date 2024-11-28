import PaintSection from "../../views/Paint/Fabric";
import PaintSectionYarn from "../../views/Paint/Yarn";

export const paintSection = [
  {
    parent: "paint",
    link: "fabrik",
    sidebar: true,
    title: "Крашения плотно",
    parent_icon: (
      <img width={20} src="/images/paint.png" alt="warehouse paint" />
    ),
    icon: <img width={18} src="/images/paint-fabrik.png" alt="paint" />,
    element: <PaintSection />,
    auth: false,
  },
  {
    parent: "paint",
    link: "yarn",
    sidebar: true,
    title: "Крашения пряжы",
    icon: <img width={18} src="/images/paint-yarn.png" alt="paint yarn" />,
    element: <PaintSectionYarn />,
    auth: false,
  },
];
