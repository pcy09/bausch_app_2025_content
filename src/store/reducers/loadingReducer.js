import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state, action) => {
      state.loading = true;
    },
    endLoading: (state, action) => {
      state.loading = false;
    },
  },
});

export const { startLoading, endLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
