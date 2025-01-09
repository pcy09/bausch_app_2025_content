import { createSlice } from '@reduxjs/toolkit';
import { ProductBauschInfoInit } from '@/store/initialState';

const initialState = {
  ...ProductBauschInfoInit,
  totalElements: 0,
};

export const productInfoSlice = createSlice({
  name: 'productBauschInfo',
  initialState,
  reducers: {
    // 상품 정보 리스트
    getProductInfoListAction: (state, action) => {
      return state;
    },
    changeInfoSearchData: (state, action) => {
      state.search = action.payload;
    },
    // 상품 리스트 store 업데이트
    insertProductInfoListAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },
    // 제품 삭제
    productInfoDeleteBauschAction: state => {
      return state;
    },
    // 노출 비노출 업데이트
    updateProductInfoExposedAction: (state, action) => {
      return state;
    },
    // 정보 초기화하기
    productBauschInfoReset: state => {
      Object.assign(state, initialState);
    },
    // 상품 등록하기 ( 바슈롬 )
    createProductInfoAction: (state, action) => {
      return state;
    },
    // 상품 등록하기 ( 렌즐리 )
    createProductLenslyInfoAction: (state, action) => {
      return state;
    },
    // 상품 수정하기 ( 바슈롬 )
    updateProductInfoAction: (state, action) => {
      return state;
    },
    // 상품 수정하기 ( 렌즐리 )
    updateProductLenslyInfoAction: (state, action) => {
      return state;
    },
    // 이미지 삭제하기
    deleteEditorImageAction: (state, action) => {
      return state;
    },
  },
});

export const {
  getProductInfoListAction,
  changeInfoSearchData,
  insertProductInfoListAction,
  productBauschInfoReset,
  productInfoDeleteBauschAction,
  updateProductInfoExposedAction,
  createProductInfoAction,
  createProductLenslyInfoAction,
  updateProductInfoAction,
  updateProductLenslyInfoAction,
  deleteEditorImageAction,
} = productInfoSlice.actions;

export default productInfoSlice.reducer;
