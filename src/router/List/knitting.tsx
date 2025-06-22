import CellsAfterKK from "../../views/Kniting/CellsAfterKK";
import KnittingMachines from "../../views/Kniting/Machines";
import KnittingProcess from "../../views/Kniting/Process";
import { RollsKK } from "../../views/Kniting/RollsKK";

export const knittingList = [
  {
    parent: "knitting",
    link: "machines",
    sidebar: true,
    title: "knittingavto",
    parent_icon: "/images/kniting.webp",
    icon: "/images/kniting.webp",
    element: <KnittingMachines />,
    permissions: ["view_page", "edit"],
    auth: false,
  },
  {
    parent: "knitting",
    link: "accessories",
    sidebar: true,
    title: "kniting_accessories",
    icon: "/images/rope.png",
    element: <KnittingMachines />,
    permissions: ["view_page"],
    auth: true,
  },
  {
    parent: "knitting",
    link: "rolls-kk",
    sidebar: true,
    title: "rolls_for_kk",
    icon: "/images/roll-kk.png",
    element: <RollsKK />,
    permissions: ["view_page"],
    auth: true,
  },
  {
    parent: "knitting",
    link: "cells-after-kk",
    sidebar: true,
    title: "Клетки после КК",
    icon: "/images/box.webp",
    element: <CellsAfterKK />,
    permissions: ["view_page"],
    auth: true,
  },
  {
    parent: "knitting",
    link: "loaders",
    sidebar: true,
    title: "Дашборд грузчиков 614",
    icon: "/images/fork-loader.webp",
    element: <KnittingProcess />,
    permissions: ["view_page"],
    auth: true,
  },
];
