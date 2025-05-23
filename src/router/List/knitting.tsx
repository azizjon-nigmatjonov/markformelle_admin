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
    parent_icon: (
      <img
        width={18}
        src="/images/kniting.webp"
        alt="knitting parent"
        loading="lazy"
      />
    ),
    icon: (
      <img
        width={18}
        src="/images/kniting.webp"
        alt="knitting"
        loading="lazy"
      />
    ),
    element: <KnittingMachines />,
    permissions: ["view_page", "edit"],
    auth: false,
  },
  {
    parent: "knitting",
    link: "accessories",
    sidebar: true,
    title: "kniting_accessories",
    icon: <img width={22} src="/images/rope.png" alt="rope" loading="lazy" />,
    element: <KnittingMachines />,
    permissions: ["view_page"],
    auth: true,
  },
  {
    parent: "knitting",
    link: "rolls-kk",
    sidebar: true,
    title: "rolls_for_kk",
    icon: (
      <img width={20} src="/images/roll-kk.png" alt="roll kk" loading="lazy" />
    ),
    element: <RollsKK />,
    permissions: ["view_page"],
    auth: true,
  },
  {
    parent: "knitting",
    link: "cells-after-kk",
    sidebar: true,
    title: "Клетки после КК",
    icon: (
      <img width={24} src="/images/box.webp" alt="box cell" loading="lazy" />
    ),
    element: <CellsAfterKK />,
    permissions: ["view_page"],
    auth: true,
  },
  {
    parent: "knitting",
    link: "loaders",
    sidebar: true,
    title: "Дашборд грузчиков 614",
    icon: (
      <img
        width={24}
        src="/images/fork-loader.webp"
        alt="loader"
        loading="lazy"
      />
    ),
    element: <KnittingProcess />,
    permissions: ["view_page"],
    auth: true,
  },
];
