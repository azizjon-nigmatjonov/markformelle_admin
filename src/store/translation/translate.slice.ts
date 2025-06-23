import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  translations: {}, // Store translations by language: { ru: {...}, en: {...}, uz: {...} }
  isLoading: false,
  lastUpdated: null,
};

export const { actions: translateActions, reducer: translateReducer } = createSlice(
  {
    name: "translation",
    initialState,
    reducers: {
      setTranslation: (state: any, { payload }) => {
        state.translation = payload;
      },
      setTranslationsByLang: (state: any, { payload: { lang, translations } }) => {
        state.translations[lang] = translations;
        state.lastUpdated = new Date().toISOString();
      },
      setLoading: (state: any, { payload }) => {
        state.isLoading = payload;
      },
      clearTranslations: (state: any) => {
        state.translations = {};
        state.lastUpdated = null;
      },
    },
  }
);
