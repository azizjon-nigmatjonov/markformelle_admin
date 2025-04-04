import DryingPage from "../../views/Drying/Drying";
// import PosPage from "../../views/Drying/Pos";

export const dryingList = [
  {
    parent: "drying",
    link: "drying",
    sidebar: true,
    title: "Сушилка",
    parent_icon: <img width={18} src="/images/drying.png" alt="drying" />,
    icon: <img width={18} src="/images/drying.png" alt="drying icon" />,
    element: <DryingPage />,
    auth: true,
    permissions: ["view_page"],
  },
  // {
  //   parent: "drying",
  //   link: "pos-processing",
  //   sidebar: true,
  //   title: "Пост обработка",
  //   parent_icon: <img width={18} src="/images/drying.png" alt="processing" />,
  //   icon: (
  //     <img
  //       width={18}
  //       src="/images/posprocessing.png"
  //       alt="posprocessing icon"
  //     />
  //   ),
  //   element: <PosPage />,
  //   auth: true,
  //   permissions: ["view_page"],
  // },
];
