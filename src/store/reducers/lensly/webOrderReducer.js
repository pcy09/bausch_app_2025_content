import { createSlice } from '@reduxjs/toolkit';
import { WebOrderInit } from '@/store/initialState';

const initialState = WebOrderInit;

export const webOrderSlice = createSlice({
  name: 'webOrder',
  initialState,
  reducers: {
    getWebOrderDataAction: (state, action) => {
      return state;
    },
    insertWebOrderDataAction: (state, action) => {
      state.orderHeaderFile = action.payload.orderHeaderFile;
      state.orderDetailFile = action.payload.orderDetailFile;
      state.failData = action.payload.failData;
      state.successData = action.payload.successData;
      state.mappingData = action.payload.mappingData;
    },
    asyncWebOrderDataAction: (state, action) => {
      return state;
    },
    getReturnOrderDataAction: (state, action) => {
      return state;
    },
    insertReturnOrderDataAction: (state, action) => {
      state.returnData = action.payload.returnData;
      state.successData = action.payload.successData;
    },
    asyncReturnOrderAction: (state, action) => {
      return state;
    },
    webOrderReset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getWebOrderDataAction,
  insertWebOrderDataAction,
  asyncWebOrderDataAction,
  getReturnOrderDataAction,
  insertReturnOrderDataAction,
  asyncReturnOrderAction,
  webOrderReset,
} = webOrderSlice.actions;

export default webOrderSlice.reducer;
