import { adminList } from "./admins";
import { knitingList } from "./kniting";
import { settingList } from "./settings";

export const routeList = [
  ...settingList,
  ...knitingList,
  ...adminList
];
