import { adminList } from "./admins";
import { chniSection } from "./chni";
import { dryingList } from "./drying";
import { knittingList } from "./knitting";
import { paintSection } from "./paint";
import { settingList } from "./settings";
import { stores } from "./stores";
import { wareHouse } from "./warehouse";

export const routeList = [
  ...settingList,
  ...knittingList,
  ...wareHouse,
  ...paintSection,
  ...dryingList,
  ...chniSection,
  ...adminList,
  ...stores
];
