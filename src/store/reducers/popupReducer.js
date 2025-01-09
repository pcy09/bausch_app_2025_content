import { popupInit } from '@/store/initialState';
import { createSlice } from '@reduxjs/toolkit';

const initialState = popupInit;
export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopupAction: (state, action) => {
      state.show = action.payload.show;
      state.type = action.payload.type;
    },
    resetPopupAction: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { openPopupAction, resetPopupAction } = popupSlice.actions;

export default popupSlice.reducer;
