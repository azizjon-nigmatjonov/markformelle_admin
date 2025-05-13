import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currTime: "",
  searchFields: {},
};

export const { actions: globalToolActions, reducer: globalToolReducer } =
  createSlice({
    name: "globalTool",
    initialState,
    reducers: {
      setCurrTime: (state: any, { payload }) => {
        state.currTime = payload;
      },
      setSearchFields: (state: any, { payload: { pageName, payload } }) => {
        state.searchFields[pageName] = payload;
      },
    },
  });
