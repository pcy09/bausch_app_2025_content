import { createSlice } from '@reduxjs/toolkit';
import { managerInit } from '@/store/initialState';

const initialState = managerInit;

export const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    getManagerList: (state, action) => {
      return state;
    },
    insertManagerList: (state, action) => {
      state.managerList = action.payload.list;
      state.paging = action.payload.paging;
    },
    getManagerDetail: (state, action) => {
      return state;
    },
    insertManagerDetail: (state, action) => {
      state.managerDetail = action.payload.detailData;
    },
    updateManagerAction: (state, action) => {
      return state;
    },
    deleteManagerAction: (state, action) => {
      return state;
    },
    managerReset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { getManagerList, insertManagerList, getManagerDetail, updateManagerAction, deleteManagerAction, insertManagerDetail, managerReset } =
  managerSlice.actions;

export default managerSlice.reducer;
