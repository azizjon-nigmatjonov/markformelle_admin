import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  machine_info: {},
};

export const { actions: mashineActions, reducer: machineReducer } = createSlice(
  {
    name: "machine",
    initialState,
    reducers: {
      setMachineTimer: (state: any, { payload: { id, payload } }) => {
        state.machine_info[id] = payload;
      },
    },
  }
);
