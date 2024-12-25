import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  rolls: [],
  token: "",
  link: "",
  lang: "ru",
  version: "",
};

export const { actions: authActions, reducer: authReducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setRolls: (state, { payload }) => {
      state.rolls = payload;
    },
    login: (state, { payload }) => {
      state.token = payload?.access_token ?? "";
    },
    setLink: (state, { payload }) => {
      state.link = payload;
    },
    setLang: (state, { payload }) => {
      state.lang = payload;
    },
    setVersion: (state, { payload }) => {
      state.version = payload;
    },
    logout: () => initialState,
  },
});
