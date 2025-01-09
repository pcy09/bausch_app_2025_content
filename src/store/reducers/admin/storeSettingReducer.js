import { storeSettingInit } from '@/store/initialState';
import { createSlice } from '@reduxjs/toolkit';

export const storeSettingSlice = createSlice({
  name: 'storeSetting',
  initialState: storeSettingInit,
  reducers: {
    openStore: (state, action) => {
      state.show = true;
    },
    closeStore: (state, action) => {
      state.show = false;
    },
  },
});

export const { openStore, closeStore } = storeSettingSlice.actions;

export default storeSettingSlice.reducer;
