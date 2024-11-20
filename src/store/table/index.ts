import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  columns: {},
  order: {},
};

export const { actions: tableStoreActions, reducer: tableReducer } =
  createSlice({
    name: "table",
    initialState,
    reducers: {
      setColumns: (state: any, { payload: { pageName, payload } }) => {
        state.columns[pageName] = payload;
      },
      setOrder: (state: any, { payload: { pageName, payload } }) => {
        state.order[pageName] = payload;
      },
    },
  });
