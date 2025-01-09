import { createSlice } from '@reduxjs/toolkit';
import { popups } from '@/store/initialState';
export const popupSlice = createSlice({
  name: 'popups',
  initialState: popups,
  reducers: {
    openPops: (state, action) => {
      state.isModalOpen = action.payload.isModalOpen;
      state.title = action.payload.title || state.title; // Default to current state title if no title provided
      state.content = action.payload.content;
      state.buttonsConfig = action.payload.buttonsConfig || state.buttonsConfig;
      state.width = action.payload.width || state.width;
    },
  },
});
export const { openPops } = popupSlice.actions;
export default popupSlice.reducer;
