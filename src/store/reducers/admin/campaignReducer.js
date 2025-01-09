import { createSlice } from '@reduxjs/toolkit';
import { CampaignInit } from '@/store/initialState';

const initialState = {
  ...CampaignInit,
  totalElements: 0,
};

export const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    getCampaignCouponListAction: (state, action) => {
      return state;
    },
    insertCampaignCouponListAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },
    changeSearchData: (state, action) => {
      state.search = action.payload;
    },
    // 쿠폰 삭제
    deleteCouponAction: state => {
      return state;
    },
    // 재발급 쿠폰 삭제
    deleteReissueCouponAction: state => {
      return state;
    },
    updateCampaignCouponExposedAction: (state, action) => {
      return state;
    },
    updateReissueCampaignCouponExposedAction: (state, action) => {
      return state;
    },
    campaignReset: state => {
      Object.assign(state, initialState);
    },
    getReissueMemberCouponAction: (state, action) => {
      return state;
    },
    getReissueCouponSelectAction: (state, action) => {
      return state;
    },
    insertReissueMemberAction: (state, action) => {
      state.reissueMemberListData = action.payload.reissueMemberListData;
    },
    insertReissueCouponSelectAction: (state, action) => {
      state.reissueCouponSelectData = action.payload.reissueCouponSelectData;
    },
    resetReissueCouponSelectAction: (state, action) => {
      state.reissueCouponSelectData = [];
    },
    postCreateCouponAction: state => {
      return state;
    },
    postReissueCouponAction: state => {
      return state;
    },
  },
});
export const {
  getCampaignCouponListAction,
  postCreateCouponAction,
  postReissueCouponAction,
  insertReissueMemberAction,
  insertReissueCouponSelectAction,
  resetReissueCouponSelectAction,
  getReissueCouponSelectAction,
  updateCampaignCouponExposedAction,
  deleteCouponAction,
  deleteReissueCouponAction,
  insertCampaignCouponListAction,
  updateReissueCampaignCouponExposedAction,
  changeSearchData,
  getReissueMemberCouponAction,
  campaignReset,
} = campaignSlice.actions;

export default campaignSlice.reducer;
