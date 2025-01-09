import { createSlice } from '@reduxjs/toolkit';
import { commonCodeInit } from '@/store/initialState';

const initialState = commonCodeInit;

export const commonCodeSlice = createSlice({
  name: 'commonCode',
  initialState,
  reducers: {
    getCommonCodeListAction: (state, action) => {
      return state;
    },
    getManyCommonCodeListAction: (state, action) => {
      return state;
    },
    insertCommonCodeListAction: (state, action) => {
      state.commonCodeList = action.payload.data;
      state.lensCycle = action.payload.data.lensCycle;
      state.storeSearchCord = action.payload.data.storeSearchCord;
      state.storeType = action.payload.data.storeType;
      state.lensPowerType = action.payload.data.lensPowerType;
      state.storeLocation = action.payload.data.storeLocation;
      state.autoOrderStatus = action.payload.data.autoOrderStatus;
      state.channelType = action.payload.data.channelType;
      state.salesStatus = action.payload.data.salesStatus;
    },
    codeListResetAction: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { getCommonCodeListAction, getManyCommonCodeListAction, insertCommonCodeListAction, codeListResetAction } = commonCodeSlice.actions;

export default commonCodeSlice.reducer;
