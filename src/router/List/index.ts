import { adminList } from "./admins";
import { chniSection } from "./chni";
import { knittingList } from "./knitting";
import { paintSection } from "./paint";
import { settingList } from "./settings";
import { wareHouse } from "./warehouse";

export const routeList = [
  ...settingList,
  ...knittingList,
  ...wareHouse,
  ...paintSection,
  ...chniSection,
  ...adminList,
];
