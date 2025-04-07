import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import { authReducer } from "./auth/auth.slice";
import storage from "redux-persist/lib/storage";
import { websiteReducer } from "./website";
import { tableSizeReducer } from "./tableSize/tableSizeSlice";
import { notificationReducer } from "./notification";
import { sidebarReducer } from "./sidebar";
import { filterReducer } from "./filterParams";
import { tableReducer } from "./table";
import { machineReducer } from "./machine/machine.slice";
import { globalToolReducer } from "./globalTools";
import { translateReducer } from "./translation/translate.slice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const tableSizePersistConfig = {
  key: "tableSize",
  storage,
};

const notificationPersistConfig = {
  key: "notificationReducer",
  storage,
};

const sidebarPersistConfig = {
  key: "sidebar",
  storage,
};

const filterPersistConfig = {
  key: "filter",
  storage,
};

const tablePersistConfig = {
  key: "table",
  storage,
};

const machinePersistConfig = {
  key: "machine",
  storage,
};

const globalToolPersistConfig = {
  key: "globalTool",
  storage,
};

const translationPersistConfig = {
  key: 'translation',
  storage
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  tableSize: persistReducer(tableSizePersistConfig, tableSizeReducer),
  notification: persistReducer(notificationPersistConfig, notificationReducer),
  sidebar: persistReducer(sidebarPersistConfig, sidebarReducer),
  filter: persistReducer(filterPersistConfig, filterReducer),
  table: persistReducer(tablePersistConfig, tableReducer),
  machine: persistReducer(machinePersistConfig, machineReducer),
  globalTool: persistReducer(globalToolPersistConfig, globalToolReducer),
  translation: persistReducer(translationPersistConfig, translateReducer),
  website: websiteReducer,
});

export default rootReducer;
