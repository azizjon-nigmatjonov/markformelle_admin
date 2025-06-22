import PaintSection from "../../views/Paint/Fabric";
import PaintSectionYarn from "../../views/Paint/Yarn";

export const paintSection = [
  {
    parent: "dying",
    link: "fabric",
    sidebar: true,
    title: "Крашения плотно",
    parent_icon: "/images/paint.png",
    icon: "/images/paint-fabrik.png",
    element: <PaintSection />,
    auth: true,
    permissions: ["view_page"],
  },
  {
    parent: "dying",
    link: "yarn",
    sidebar: true,
    title: "Крашения пряжи",
    icon: "/images/paint-yarn.png",
    element: <PaintSectionYarn />,
    auth: true,
    permissions: ["view_page"],
  },
];
