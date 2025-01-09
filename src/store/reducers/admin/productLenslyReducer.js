import { createSlice } from '@reduxjs/toolkit';
import { productLenslyInit } from '@/store/initialState';

const initialState = {
  ...productLenslyInit,
  totalElements: 0,
};

export const productLenslySlice = createSlice({
  name: 'productLensly',
  initialState,
  reducers: {
    // 제품 리스트
    getProductLenslyListAction: (state, action) => {
      return state;
    },
    getProductInfoLenslyListAction: (state, action) => {
      return state;
    },
    changeLenslySearchData: (state, action) => {
      state.search = action.payload;
    },
    // 제품 상세 호출
    getProductLenslyDetailAction: (state, action) => {
      return state;
    },
    insertProductLenslyDetailAction: (state, action) => {
      state.productDetail = action.payload.productDetail;
    },

    // 제품 상세 데이터 update
    updateProductLenslyDetailAction: state => {
      return state;
    },
    // 제품 상세 데이터 update 주입
    upsertProductLenslyDetailAction: (state, action) => {
      state.productDetail = action.payload.productDetail;
    },

    // 제품 sku 업로드
    updateInsertLenslySkuAction: (state, action) => {
      state.productDetail.skuInfoModels = action.payload.skuInfoModels;
    },
    updateLenslySkuAction: state => {
      return state;
    },

    // 제품 리스트 store 업데이트
    insertProductLenslyListAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },

    // 상품 등록 리스트 업데이트
    insertProductInfoLenslyListAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },

    // 제품 등록
    createProductLenslyAction: (state, action) => {
      return state;
    },
    // 제품 상세 데이터 store update
    upsertProductLenslyDetailAction: (state, action) => {
      state.productDetail = action.payload.productDetail;
    },
    // 정보 초기화하기
    productLenslyReset: state => {
      Object.assign(state, initialState);
    },
    // 제품 삭제
    productDeleteLenslyAction: state => {
      return state;
    },
  },
});

export const {
  // 제품 리스트
  getProductLenslyListAction,
  // 싱품정보관리 등록 리스트
  getProductInfoLenslyListAction,
  // 검색 옵션
  changeLenslySearchData,
  // 제품 리스트 업데이트
  insertProductLenslyListAction,
  // 제품 상세
  getProductLenslyDetailAction,
  insertProductLenslyDetailAction,
  // 상품정보관리 업데이트
  insertProductInfoLenslyListAction,
  // 제품 상세 업데이트
  updateProductLenslyDetailAction,
  // 제품 등록
  createProductLenslyAction,
  // 제품 상세 Upsert
  upsertProductDetailAction,
  //sku 업로드
  updateLenslySkuAction,
  updateInsertLenslySkuAction,

  // 초기화하기
  productLenslyReset,
  //제품 삭제
  productDeleteLenslyAction,
} = productLenslySlice.actions;

export default productLenslySlice.reducer;
