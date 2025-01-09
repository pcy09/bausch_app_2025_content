import { createSlice } from '@reduxjs/toolkit';
import { CampaignDetailInit } from '@/store/initialState';
import { get } from 'react-hook-form';

const initialState = {
  ...CampaignDetailInit,
  totalElements: 0,
  storeAddSearchResult: [],
};

export const campaignDetailSlice = createSlice({
  name: 'campaignDetail',
  initialState,
  reducers: {
    getCampaignDetailStoreGroupListAction: (state, action) => {
      return state;
    },
    insertCampaignDetailStoreGroupListAction: (state, action) => {
      state.storeAddSearchResult = action.payload.result;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },
    changeSearchData: (state, action) => {
      state.search = action.payload;
    },
    campaignDetailReset: state => {
      Object.assign(state, initialState);
    },
    deleteCampaignStoreAction: state => {
      return state;
    },
    uploadCampaignDetailStoreExcelAction: (state, action) => {
      return state;
    },
    insertCampaignDetailStoreExcelAction: (state, action) => {
      state.result = action.payload.result;
      state.multipartFile = action.payload.multipartFile;
    },
    insertCampaignDetailStoreGroupDeleteAction: (state, action) => {
      state.storeAddSearchResult = action.payload.result;
    },
    getDetailCouponStoreListAction: (state, action) => {
      return state;
    },
    insertDetailCouponStoreListAction: (state, action) => {
      state.result = action.payload.result;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },
    postCampaignDetailStoreMergeAction: (state, action) => {
      return state;
    },
    registerStoreFromExcelAction: (state, action) => {
      return state;
    },
    deleteStoreFromExcelAction: (state, action) => {
      return state;
    },
    deleteCampaignDetailStoreMergeAction: (state, action) => {
      return state;
    },
    deleteCouponClickAction: (state, action) => {
      return state;
    },
    deleteStoreSetListAction: (state, action) => {
      return state;
    },
    insertDeleteStoreSetListAction: (state, action) => {
      state.result = action.payload.result;
    },
    getCouponDetailListAction: (state, action) => {
      return state;
    },
    insertCouponDetailListAction: (state, action) => {
      state.resultDetail = action?.payload?.resultDetail;
    },
    // 쿠폰 수정
    updateCouponAction: state => {
      return state;
    },
  },
});
export const {
  campaignDetailReset,
  deleteStoreSetListAction,
  getCouponDetailListAction,
  insertCouponDetailListAction,
  insertDeleteStoreSetListAction,
  deleteCouponClickAction,
  deleteCampaignDetailStoreMergeAction,
  uploadCampaignDetailStoreExcelAction,
  deleteCampaignStoreAction,
  getDetailCouponStoreListAction,
  insertDetailCouponStoreListAction,
  insertCampaignDetailStoreExcelAction,
  insertCampaignDetailStoreGroupDeleteAction,
  getCampaignDetailStoreGroupListAction,
  insertCampaignDetailStoreGroupListAction,
  changeSearchData,
  postCampaignDetailStoreMergeAction,
  registerStoreFromExcelAction,
  deleteStoreFromExcelAction,
  updateCouponAction,
} = campaignDetailSlice.actions;

export default campaignDetailSlice.reducer;
