import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  machine_info: [],
};

export const { actions: machineActions, reducer: machineReducer } = createSlice(
  {
    name: "machine",
    initialState,
    reducers: {
      setMachineTimer: (state: any, { payload }) => {
        state.machine_info = payload;
      },
    },
  }
);
