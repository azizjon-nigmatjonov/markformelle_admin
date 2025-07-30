import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebsiteState, Route, AlertData } from "../types";

const initialState: WebsiteState = {
  routes: {},
  new_routes: {},
  alert: {},
  liteTableOpen: "",
  modalType: "",
  dirty_places: {
    list: [],
    isDirty: false,
  },
};

export const { actions: websiteActions, reducer: websiteReducer } = createSlice(
  {
    name: "website",
    initialState,
    reducers: {
      setRoutes: (
        state,
        { payload }: PayloadAction<Record<string, Route[]>>
      ) => {
        state.routes = payload;
      },
      setNewRoutes: (
        state,
        { payload }: PayloadAction<Record<string, Route[]>>
      ) => {
        state.new_routes = payload;
      },
      setAlertData: (
        state,
        { payload }: PayloadAction<AlertData | Record<string, unknown>>
      ) => {
        state.alert = payload;
      },
      setLiteTableOpen: (state, { payload }: PayloadAction<string>) => {
        state.liteTableOpen = payload;
      },
      setModalType: (state, { payload }: PayloadAction<string>) => {
        state.modalType = payload;
      },
      setDirtyPlaces: (
        state,
        { payload }: PayloadAction<{ list: string; isDirty: boolean }>
      ) => {
        state.dirty_places = {
          list:
            payload.list === ""
              ? []
              : state.dirty_places.list?.includes(payload.list)
              ? state.dirty_places.list.filter((item) => item !== payload.list)
              : [...state.dirty_places.list, payload.list],
          isDirty: payload.isDirty,
        };
      },
    },
  }
);
