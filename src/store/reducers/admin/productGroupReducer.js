import { ProductGroupInit } from '@/store/initialState';
import { createSlice } from '@reduxjs/toolkit';

const initialState = ProductGroupInit;

export const productGroupSlice = createSlice({
  name: 'productGroup',
  initialState,
  reducers: {
    getProductGroupListAction: state => {
      return state;
    },
    // 제품 그룹 리스트(바슈롬)
    insertProductGroupListAction: (state, action) => {
      state.productBauschGroupList = action.payload.productBauschGroupList;
    },

    // 제품 그룹 리스트(렌즐리)
    insertLenslyProductGroupListAction: (state, action) => {
      state.productLenslyGroupList = action.payload.productLenslyGroupList;
    },

    // 제품 그룹 등록(바슈롬)
    createProductGroupAction: (state, action) => {
      return state;
    },
    // 제품 그룹 등록 데이터 삽입(바슈롬)
    upsertProductGroupAction: (state, action) => {
      state.productBauschGroupList = action.payload.productBauschGroupList;
    },

    // 제품 그룹 등록 데이터 삽입(렌즐리)
    upsertLenslyProductGroupAction: (state, action) => {
      state.productLenslyGroupList = action.payload.productLenslyGroupList;
    },

    // 제품 삭제(바슈롬)
    productGroupDeleteAction: state => {
      return state;
    },
    // 제품 그룹 업데이트(바슈롬)
    productUpdateAction: (state, action) => {
      return state;
    },
  },
});

export const {
  // 제품 그룹 리스트
  getProductGroupListAction,
  // 제품 그룹 데이터 주입
  insertProductGroupListAction,
  // 제품 그룹 데이터 주입(렌즐리)
  insertLenslyProductGroupListAction,
  createProductGroupAction,
  upsertProductGroupAction,
  //렌즐리 제품 그룹 업데이트
  upsertLenslyProductGroupAction,
  // 제품 그룹 삭제
  productGroupDeleteAction,
  // 제품 업데이트
  productUpdateAction,
} = productGroupSlice.actions;

export default productGroupSlice.reducer;
