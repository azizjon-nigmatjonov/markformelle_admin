import Admins from "../../views/Admins/Admins";
import Rolls from "../../views/Admins/Rolls";
import NewRolls from "../../views/Admins/Rolls/AddRolls";
import RoutePage from "../../views/Admins/RoutePage";
import Users from "../../views/Admins/Users";

export const adminList = [
  {
    parent: "access",
    link: "users",
    sidebar: true,
    title: "users",
    icon: "users",
    element: <Users />,
    auth: true,
  },
  {
    parent: "access",
    link: "admin",
    sidebar: true,
    title: "admins",
    icon: "admins",
    element: <Admins />,
    auth: true,
  },
  {
    parent: "access",
    link: "rolls",
    sidebar: true,
    title: "rolls",
    icon: "rolls_icon",
    element: <Rolls />,
    auth: false,
  },
  {
    parent: "access",
    link: "rolls/create",
    sidebar: false,
    title: "rolls",
    icon: "",
    element: <NewRolls />,
    single_page: false,
  },
  {
    parent: "access",
    link: "rolls/:id",
    sidebar: false,
    title: "edit_roll",
    icon: "",
    element: <NewRolls />,
    single_page: false,
  },
  {
    parent: "access",
    link: "routes",
    sidebar: true,
    title: "pages",
    icon: "pages",
    element: <RoutePage />,
    permissions: ["add_permission", "delete_permisson"],
    auth: false,
  },
];
