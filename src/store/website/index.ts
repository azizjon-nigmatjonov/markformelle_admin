import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebsiteState, Route, AlertData } from "../types";

const initialState: WebsiteState = {
  routes: {},
  new_routes: {},
  alert: {},
  liteTableOpen: "",
  modalType: "",
};

export const { actions: websiteActions, reducer: websiteReducer } = createSlice(
  {
    name: "website",
    initialState,
    reducers: {
      setRoutes: (state, { payload }: PayloadAction<Record<string, Route[]>>) => {
        state.routes = payload;
      },
      setNewRoutes: (state, { payload }: PayloadAction<Record<string, Route[]>>) => {
        state.new_routes = payload;
      },
      setAlertData: (state, { payload }: PayloadAction<AlertData | Record<string, unknown>>) => {
        state.alert = payload;
      },
      setLiteTableOpen: (state, { payload }: PayloadAction<string>) => {
        state.liteTableOpen = payload;
      },
      setModalType: (state, { payload }: PayloadAction<string>) => {
        state.modalType = payload;
      },
    },
  }
);
