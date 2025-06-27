import { OrderList } from "../../views/Orders/Orders";

export const oderList = [
  {
    parent: "orders",
    link: "orders",
    sidebar: true,
    title: "orders",
    parent_icon: "/images/order.png",
    icon: "/images/order.png",
    element: <OrderList />,
    auth: true,
    permissions: ["view_page", "edit"],
  },
];
