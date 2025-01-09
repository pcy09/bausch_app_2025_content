import { createSlice } from '@reduxjs/toolkit';

export const snackSlice = createSlice({
  name: 'snack',
  initialState: {},
  reducers: {
    snackOpen: (state, action) => {
      return state;
    },
    successSnackOpen: state => {
      return state;
    },
    errorSnackOpen: state => {
      return state;
    },
  },
});

export const { snackOpen, errorSnackOpen, successSnackOpen } = snackSlice.actions;

export default snackSlice.reducer;
