import { offlineCouponInit } from '@/store/initialState';
import { createSlice } from '@reduxjs/toolkit';

const initialState = offlineCouponInit;

export const offlineCouponSlice = createSlice({
  name: 'offlineCoupon',
  initialState,
  reducers: {
    // 오프라인 쿠폰 조회
    getOfflineCouponAction: (state, action) => {
      return state;
    },
    // 오프라인 쿠폰 데이터 넣기
    insertOfflineCouponAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },
    // 쿠폰 id 넣기
    insertCouponIdAction: (state, action) => {
      state.couponId = action.payload.couponId;
    },
    // 오프라인 쿠폰 발행
    createOfflineCouponAction: state => {
      return state;
    },
    // 초기화
    OfflineCouponResetAction: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { getOfflineCouponAction, insertOfflineCouponAction, insertCouponIdAction, createOfflineCouponAction, OfflineCouponResetAction } =
  offlineCouponSlice.actions;

export default offlineCouponSlice.reducer;
