import { createSlice } from '@reduxjs/toolkit';
import { faqInit } from '@/store/initialState';

const initialState = faqInit;

export const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {
    // 자주 묻는 질문 리스트 호출
    getFaqAction: state => {
      return state;
    },
    // 자주 묻는 질문 리스트 넣기
    insertFaqDataAction: (state, action) => {
      state.faqList = action.payload.faqList;
    },
    // 자주 묻는 질문 등록,수정,삭제
    updateFaqAction: (state, action) => {
      return state;
    },
    resetFaqAction: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { getFaqAction, insertFaqDataAction, updateFaqAction, resetFaqAction } = faqSlice.actions;

export default faqSlice.reducer;
