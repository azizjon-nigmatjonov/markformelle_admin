import { adminList } from "./admins";
import { knittingList } from "./knitting";
import { settingList } from "./settings";
import { wareHouse } from "./warehouse";

export const routeList = [
  ...settingList,
  ...knittingList,
  ...wareHouse,
  ...adminList,
];
