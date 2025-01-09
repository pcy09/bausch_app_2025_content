import { createSlice } from '@reduxjs/toolkit';
import { bannerInit } from '@/store/initialState';

const initialState = bannerInit;

export const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    getBannerListAction: state => {
      return state;
    },
    insertBannerListAction: (state, action) => {
      state.bannerList = action.payload.bannerList;
    },
    registerBannerAction: state => {
      return state;
    },
    deleteBannerAction: (state, action) => {
      return state;
    },
    // 배너정보(이미지 제외) 수정
    updateBannerAction: state => {
      return state;
    },
    // 이미지 수정
    updateThumbnailAction: state => {
      return state;
    },
    bannerReset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getBannerListAction,
  insertBannerListAction,
  registerBannerAction,
  deleteBannerAction,
  updateBannerAction,
  updateThumbnailAction,
  bannerReset,
} = bannerSlice.actions;

export default bannerSlice.reducer;
