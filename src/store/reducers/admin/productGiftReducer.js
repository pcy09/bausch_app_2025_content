import { ProductGiftInit } from '@/store/initialState';
import { createSlice } from '@reduxjs/toolkit';

const initialState = ProductGiftInit;

// bausch
export const productGiftSlice = createSlice({
  name: 'productGift',
  initialState,
  reducers: {
    getProductBauschGiftListAction: state => {
      return state;
    },
    insertProductBauschGiftListAction: (state, action) => {
      state.productBauschGiftList = action.payload.productBauschGiftList;
    },

    getProductLenslyGiftListAction: state => {
      return state;
    },
    insertProductLenslyGiftListAction: (state, action) => {
      state.productGiftLenslyList = action.payload.productLenslyGiftList;
    },

    // 증정제품 등록
    createProductBauschGiftAction: state => {
      return state;
    },

    // 증정제품 삭제
    deleteProductBauschGiftAction: state => {
      return state;
    },
  },
});

export const {
  //증정제품 리스트
  getProductBauschGiftListAction,
  insertProductBauschGiftListAction,
  getProductLenslyGiftListAction,
  insertProductLenslyGiftListAction,

  // 증정제품 등록(bausch)
  createProductBauschGiftAction,
  // 증정제품 삭제
  deleteProductBauschGiftAction,
} = productGiftSlice.actions;

export default productGiftSlice.reducer;
