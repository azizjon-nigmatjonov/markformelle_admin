import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
  link: "",
};

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    login: (state, { payload }) => {
      state.token = payload?.access_token ?? "";
    },
    setLink: (state, { payload }) => {
      state.link = payload;
    },
    logout: () => initialState,
  },
});
