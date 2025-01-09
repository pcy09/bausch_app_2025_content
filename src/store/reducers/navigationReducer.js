import { navigationInit } from '@/store/initialState';
import { createSlice } from '@reduxjs/toolkit';

const initialState = navigationInit;

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    getKeyAction: state => {
      return state;
    },
    insertKeyAction: (state, action) => {
      state.selectedKeys = action.payload.selectedKeys;
      state.openKeys = action.payload.openKeys;
    },
    keyReset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { getKeyAction, insertKeyAction, keyReset } = navigationSlice.actions;

export default navigationSlice.reducer;
