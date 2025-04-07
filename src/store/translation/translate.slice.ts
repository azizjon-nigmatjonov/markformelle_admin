import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  translation: [],
};

export const { actions: translateActions, reducer: translateReducer } = createSlice(
  {
    name: "translation",
    initialState,
    reducers: {
      setTranslation: (state: any, { payload }) => {
        state.translation = payload;
      },
    },
  }
);
