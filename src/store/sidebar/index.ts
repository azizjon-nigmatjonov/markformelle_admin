import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: true,
  openHeader: false,
  resize: false
};

export const { actions: sidebarActions, reducer: sidebarReducer } = createSlice(
  {
    name: "sidebar",
    initialState,
    reducers: {
      setCollapsed: (state: any, { payload }) => {
        state.collapsed = payload;
      },
      setOpenHeader: (state: any, { payload }) => {
        state.openHeader = payload;
      },
      setResize: (state: any, { payload }) => {
        state.resize = payload;
      },
    },
  }
);
