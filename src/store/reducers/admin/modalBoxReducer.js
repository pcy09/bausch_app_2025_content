import { createSlice } from '@reduxjs/toolkit';
import { productChangeModalBoxInit } from '@/store/initialState';

const initialState = productChangeModalBoxInit;

export const modalBoxSlice = createSlice({
  name: 'modalBox',
  initialState,
  reducers: {
    openModalBox: (state, action) => {
      state.show = true;
      state.data = action.payload.data;
    },

    // 판매,증정제품 드랍 가져오기
    getModalDropDataAction: (state, action) => {
      return state;
    },
    // 판매,증정제품 드랍 정보 담기
    insertModalDropDataAction: (state, action) => {
      state.productDropData = action.payload.productDropData;
      state.giftDropData = action.payload.giftDropData;
    },

    // 제품 변경
    updateCouponProductAction: (state, action) => {
      return state;
    },

    closeModalBox: (state, action) => {
      Object.assign(state, initialState);
    },
  },
});

export const { openModalBox, getModalDropDataAction, insertModalDropDataAction, updateCouponProductAction, closeModalBox } = modalBoxSlice.actions;

export default modalBoxSlice.reducer;
