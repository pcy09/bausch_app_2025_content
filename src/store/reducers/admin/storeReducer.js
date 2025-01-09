import { createSlice } from '@reduxjs/toolkit';
import { StoreInit } from '@/store/initialState';

const initialState = {
  ...StoreInit,
  totalElements: 0,
};

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    getStoreListAction: (state, action) => {
      return state;
    },
    insertStoreListAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },
    changeSearchData: (state, action) => {
      state.search = action.payload;
    },
    getStoreDetailAction: (state, action) => {
      return state;
    },
    insertStoreDetailAction: (state, action) => {
      state.storeDetailData = action.payload.storeDetailData;
      state.appStoreHistories = action.payload.appStoreHistories;
    },
    getStoreDetailOpticianAction: (state, action) => {
      return state;
    },
    insertStoreDetailOpticianAction: (state, action) => {
      state.storeOpticianList = action.payload.storeOpticianList;
    },
    getStoreDetailPointAction: (state, action) => {
      return state;
    },
    insertStoreDetailPointAction: (state, action) => {
      state.pointList = action.payload.pointList;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
      state.pointGroups = action.payload.pointGroups;
    },
    postStoreDetailPointCreateAction: (state, action) => {
      return state;
    },
    updateStoreDetailAction: (state, action) => {
      return state;
    },
    getPointDetailPopupAction: (state, action) => {
      return state;
    },
    insertPointDetailPopupAction: (state, action) => {
      state.pointDetailData = action.payload.pointDetailData;
    },
    updateStoreDetailPointAction: (state, action) => {
      return state;
    },
    storeReset: state => {
      Object.assign(state, initialState);
    },
  },
});
export const {
  getStoreListAction,
  postStoreDetailPointCreateAction,
  insertStoreListAction,
  updateStoreDetailPointAction,
  getStoreDetailAction,
  getPointDetailPopupAction,
  insertStoreDetailAction,
  insertPointDetailPopupAction,
  updateStoreDetailAction,
  getStoreDetailOpticianAction,
  insertStoreDetailOpticianAction,
  getStoreDetailPointAction,
  insertStoreDetailPointAction,
  storeReset,
  changeSearchData,
} = storeSlice.actions;

export default storeSlice.reducer;
