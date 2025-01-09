import { createSlice } from '@reduxjs/toolkit';
import { StoreGroupInit } from '@/store/initialState';

const initialState = {
  ...StoreGroupInit,
  totalElements: 0,
  groupName: '',
};

export const storGroupSlice = createSlice({
  name: 'storeGroup',
  initialState,
  reducers: {
    getStoreGroupListAction: (state, action) => {
      return state;
    },
    insertStoreGroupListAction: (state, action) => {
      state.content = action.payload.content;
    },
    getStoreGroupDetailListAction: (state, action) => {
      return state;
    },
    insertStoreGroupDetailListAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
      state.groupName = action.payload.groupName; // groupName 설정
    },
    changeSearchData: (state, action) => {
      state.search = action.payload;
    },
    updateStoreGroupNameDetailAction: (state, action) => {
      return state;
    },
    updateStoreGroupDetailAutoOrderStatusAction: (state, action) => {
      return state;
    },
    updateStoreGroupDetailOnceAction: (state, action) => {
      return state;
    },
    storeGroupReset: state => {
      Object.assign(state, initialState);
    },
  },
});
export const {
  updateStoreGroupDetailOnceAction,
  getStoreGroupListAction,
  updateStoreGroupDetailAutoOrderStatusAction,
  updateStoreGroupNameDetailAction,
  getStoreGroupDetailListAction,
  insertStoreGroupDetailListAction,
  insertStoreGroupListAction,
  storeGroupReset,
  changeSearchData,
} = storGroupSlice.actions;

export default storGroupSlice.reducer;
