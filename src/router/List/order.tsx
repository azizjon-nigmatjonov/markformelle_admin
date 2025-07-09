import { OrderList } from "../../views/Orders/Orders";
import { OrdersPaintPage } from "../../views/Orders/OrdersPaint";
export const oderList = [
  {
    parent: "orders",
    link: "orders-paint",
    sidebar: true,
    title: "table_orders_knitting",
    parent_icon: "/images/order.png",
    icon: "/images/paint_2.png",
    element: <OrdersPaintPage />,
    auth: true,
    permissions: ["view_page", "edit"],
  },
  {
    parent: "orders",
    link: "orders",
    sidebar: true,
    title: "table_orders_paint",
    parent_icon: "/images/order.png",
    icon: "/images/kniting.webp",
    element: <OrderList />,
    auth: true,
    permissions: ["view_page", "edit"],
  },
];
