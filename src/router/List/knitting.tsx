import KnittingMachines from "../../views/Kniting/Machines";
import KnittingProcess from "../../views/Kniting/Process";
import { RollsKK } from "../../views/Kniting/RollsKK";

export const knittingList = [
  {
    parent: "knitting",
    link: "machines",
    sidebar: true,
    title: "knittingavto",
    parent_icon: <img width={18} src="/images/kniting.png" alt="knitting" />,
    icon: <img width={18} src="/images/kniting.png" alt="knitting" />,
    element: <KnittingMachines />,
    auth: false,
  },
  {
    parent: "knitting",
    link: "accessories",
    sidebar: true,
    title: "Вязания аксессуаров",
    icon: <img width={22} src="/images/rope.png" alt="knitting" />,
    element: <KnittingMachines />,
    auth: false,
  },
  {
    parent: "knitting",
    link: "rolls-kk",
    sidebar: true,
    title: "Рулоны для КК",
    icon: <img width={20} src="/images/roll-kk.png" alt="roll kk" />,
    element: <RollsKK />,
    auth: false,
  },
  {
    parent: "knitting",
    link: "loaders",
    sidebar: true,
    title: "Дашборд грузчиков 614",
    icon: <img width={24} src="/images/fork-loader.png" alt="loader" />,
    element: <KnittingProcess />,
    auth: false,
  },
];
