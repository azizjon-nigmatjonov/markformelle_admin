import { adminList } from "./admins";
import { dashboardList } from "./dashboard";
import { settingList } from "./settings";

export const routeList = [
  ...settingList,
  ...dashboardList,
  ...adminList
];
