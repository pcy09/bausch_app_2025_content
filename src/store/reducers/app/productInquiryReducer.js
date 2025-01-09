import { createSlice } from '@reduxjs/toolkit';
import { productInquiryInit } from '@/store/initialState';

const initialState = productInquiryInit;

export const productInquiry = createSlice({
  name: 'productInquiry',
  initialState,
  reducers: {
    // 제품문의 리스트 호출
    getProductInquiryAction: (state, action) => {
      return state;
    },
    // 제품문의 리스트 넣기
    insertProductInquiryAction: (state, action) => {
      state.productInquiryData = action.payload.productInquiryData;
    },
    // 제품문의 리스트를 id>key값으로 변환한 후 데이터 넣기
    insertProductInquiryKeyAction: (state, action) => {
      state.productInquiryKey = action.payload.productInquiryKey;
    },
    // 제품문의 상세 정보 호출
    getProductInquiryDetailAction: (state, action) => {
      return state;
    },
    // 제품문의 상세 정보 넣기
    insertProductInquiryDetailAction: (state, action) => {
      state.productInquiryDetailData = action.payload.productInquiryDetailData;
    },

    // 답변 등록,수정,삭제
    updateProductInquiryAction: (state, action) => {
      return state;
    },
    resetProductInquiryAction: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getProductInquiryAction,
  insertProductInquiryAction,
  insertProductInquiryKeyAction,
  updateProductInquiryAction,
  resetProductInquiryAction,
  getProductInquiryDetailAction,
  insertProductInquiryDetailAction,
} = productInquiry.actions;

export default productInquiry.reducer;
