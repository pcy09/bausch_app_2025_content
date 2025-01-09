import { createSlice } from '@reduxjs/toolkit';
import { pointProductOrderInit } from '@/store/initialState';

const initialState = pointProductOrderInit;

export const pointProductOrderSlice = createSlice({
  name: 'pointProductOrder',
  initialState,
  reducers: {
    getPointProductOrderDetailAction: (state, action) => {
      return state;
    },
    insertPointProductOrderDetailAction: (state, action) => {
      state.storeDetailData = action.payload.storeDetailData;
      state.appStoreHistories = action.payload.appStoreHistories;
    },
    // 판매 스토어
    getPointProductOrderDetailSellingStoreAction: (state, action) => {
      return state;
    },
    // 판매 스토어 insert action
    insertPointProductOrderDetailSellingStoreAction: (state, action) => {
      state.sellingStoreList = action.payload.sellingStoreList;
    },

    getStorePointAction: (state, action) => {
      return state;
    },
    insertStorePointAction: (state, action) => {
      state.pointStoreData = action.payload.pointStoreData;
    },
    // 제품선택 드롭 가져오기
    getPointProductListAction: (state, action) => {
      return state;
    },
    insertPointProductListAction: (state, action) => {
      state.pointProductList = action.payload.pointProductList;
    },
    // 제품 선택 드롭 초기화
    resetPointProductListAction: state => {
      state.pointProductList = [];
    },
    // 주문 등록
    createOrderAction: (state, action) => {
      return state;
    },
    // 초기화
    pointProductOrderResetAction: state => {
      state.sellingStoreList = [];
      state.pointStoreData = [];
    },
  },
});
export const {
  getPointProductOrderDetailAction,
  insertPointProductOrderDetailAction,
  // 판매 스토어
  getPointProductOrderDetailSellingStoreAction,
  insertPointProductOrderDetailSellingStoreAction,
  getStorePointAction,
  insertStorePointAction,
  // 제품선택 드롭 가져오기
  getPointProductListAction,
  insertPointProductListAction,
  resetPointProductListAction,
  // 주문등록
  createOrderAction,
  // 초기화
  pointProductOrderResetAction,
} = pointProductOrderSlice.actions;

export default pointProductOrderSlice.reducer;
