import { createSlice } from '@reduxjs/toolkit';
import { modalInit } from '../initialState';

const initialState = modalInit;

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModals: (state, action) => {
      state.show = true;
      state.id = action.payload.id;
      state.type = action.payload.type;
    },
    closeModals: (state, action) => {
      Object.assign(state, initialState);
    },
  },
});

export const { openModals, closeModals } = modalsSlice.actions;

export default modalsSlice.reducer;
