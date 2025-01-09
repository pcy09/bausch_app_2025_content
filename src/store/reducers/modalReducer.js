import { createSlice } from '@reduxjs/toolkit';
import { modalInit } from '@/store/initialState';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: modalInit,
  reducers: {
    openModal: (state, action) => {
      state.modalInfo = action.payload.modalInfo;
    },
    closeModal: (state, action) => {
      state.modalInfo = modalInit.modalInfo;
    },
    openDrawer: (state, action) => {
      state.type = action.payload.type
      state.show = action.payload.show
      state.name = action.payload.name
      state.items = action.payload.items
    },
    closeDrawer: (state) => {
      state.type = modalInit.type
      state.show = modalInit.show
      state.name = modalInit.name
      state.items = modalInit.items
    }
  },
});

export const { openModal, closeModal, openDrawer, closeDrawer } = modalSlice.actions;

export default modalSlice.reducer;
