import {
  AdminsIcon,
  AnalyticsIcon,
  Dashboard,
  IncreasingIcon,
  knittingIcon,
  PagesIcon,
  RolsIcon,
  SettingIcon,
  UsersIcon,
  ZipIcon,
  ListIconSidebar,
  CouriersIcon,
} from "./Svg/Sidebar";
import LanguageIcon from "@mui/icons-material/Language";

export const iconsList = [
  {
    name: "list",
    component: ListIconSidebar,
  },
  {
    name: "increasing",
    component: IncreasingIcon,
  },
  {
    name: "machines",
    component: knittingIcon,
  },
  {
    name: "globus",
    component: LanguageIcon,
  },
  {
    name: "knitting",
    component: knittingIcon,
  },
  {
    name: "dashboard",
    component: Dashboard,
  },
  {
    name: "zip",
    component: ZipIcon,
  },
  {
    name: "analytics",
    component: AnalyticsIcon,
  },
  {
    name: "admins",
    component: AdminsIcon,
  },
  {
    name: "users",
    component: UsersIcon,
  },
  {
    name: "rolls_icon",
    component: RolsIcon,
  },
  {
    name: "settings",
    component: SettingIcon,
  },
  {
    name: "pages",
    component: PagesIcon,
  },
  {
    name: "couriers",
    component: CouriersIcon,
  },
];
