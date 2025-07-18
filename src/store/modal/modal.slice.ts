import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalData: [],
};

export const { actions: modalsActions, reducer: modalsReducer } = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setModalData: (state: any, { payload }) => {
      state.modalData = state.modalData.find(
        (modal: any) => modal.id === payload.id
      )
        ? state.modalData.filter((modal: any) => modal.id !== payload.id)
        : [...state.modalData, payload];
    },
  },
});
