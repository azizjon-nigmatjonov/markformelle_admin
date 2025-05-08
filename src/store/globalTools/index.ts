import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currTime: "",
  searchFields: {},
  modal_position: null,
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
      setModalPosition: (state: any, { payload }) => {
        state.modal_position = payload;
      },
    },
  });
