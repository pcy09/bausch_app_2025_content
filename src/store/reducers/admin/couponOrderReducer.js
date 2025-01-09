import { createSlice } from '@reduxjs/toolkit';
import { orderUserListInit } from '@/store/initialState';

const initialState = orderUserListInit;

export const couponOrderSlice = createSlice({
  name: 'couponOrder',
  initialState,
  reducers: {
    // 쿠폰 거래내역*****************************************
    // 쿠폰 거래내역 리스트 조회
    getCouponSalesListAction: (state, action) => {
      return state;
    },
    // 쿠폰 거래내역 리스트 담기
    insertCouponSalesListAction: (state, action) => {
      state.couponSalesListData.content = action.payload.couponSalesListData;
      state.couponSalesListData.pageable = action.payload.pageable;
      state.couponSalesListData.totalElements = action.payload.totalElements;
    },

    // 판매등록***********************************************
    // 회원검색
    getCouponOrderDetailAction: (state, action) => {
      return state;
    },
    insertCouponOrderDetailAction: (state, action) => {
      state.orderUserListData = action.payload.orderUserListData;
    },

    // 적립금 디테일 데이터
    getCouponOrderReserveAction: (state, action) => {
      return state;
    },
    insertCouponOrderReserveAction: (state, action) => {
      state.orderReserveData = action.payload.orderReserveData;
    },
    // 판매,증정 제품 드롭 가져오기
    getCouponOrderDropAction: (state, action) => {
      return state;
    },
    // 판매,증정 제품 드롭 넣기
    insertCouponOrderDropAction: (state, action) => {
      state.dropData = action.payload.dropData;
    },

    // 판매 등록
    createSalesAction: (state, action) => {
      return state;
    },

    //쿠폰 거래내역 상세 ***************************************
    // 거래내역 상세 가져오기
    getCouponSalesDetailAction: (state, action) => {
      return state;
    },
    // 거래내역 상세 담기
    insertCouponSalesDetailAction: (state, action) => {
      state.couponSalesDetailData = action.payload.couponSalesDetailData;
    },

    // 거래내역 거래 취소
    deleteCouponSalesDetailAction: (state, action) => {
      return state;
    },

    // 초기화
    couponOrderResetAction: state => {
      Object.assign(state, initialState);
    },
  },
});
export const {
  // 쿠폰 거래내역
  getCouponSalesListAction,
  insertCouponSalesListAction,

  // 회원검색
  getCouponOrderDetailAction,
  insertCouponOrderDetailAction,
  // 적립금
  getCouponOrderReserveAction,
  insertCouponOrderReserveAction,
  getCouponOrderDropAction,
  insertCouponOrderDropAction,

  // 판매등록
  createSalesAction,

  // 쿠폰 거래내역 상세
  getCouponSalesDetailAction,
  insertCouponSalesDetailAction,
  deleteCouponSalesDetailAction,

  // 리셋
  couponOrderResetAction,
} = couponOrderSlice.actions;

export default couponOrderSlice.reducer;
