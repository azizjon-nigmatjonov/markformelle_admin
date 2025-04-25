import { adminList } from "./admins";
import { chniSection } from "./chni";
import { dryingList } from "./drying";
import { knittingList } from "./knitting";
import { paintSection } from "./paint";
import { settingList } from "./settings";
import { chemicalStore } from "./chemicalStore";
import { wareHouse } from "./warehouse";
import { labaratorySection } from "./labaratory";

export const routeList = [
  ...settingList,
  ...knittingList,
  ...wareHouse,
  ...paintSection,
  ...dryingList,
  ...chniSection,
  ...chemicalStore,
  ...labaratorySection,
  ...adminList,
];
