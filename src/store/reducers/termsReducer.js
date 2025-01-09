import { createSlice } from '@reduxjs/toolkit';
import { termsInit } from '@/store/initialState';

const initialState = termsInit;

export const termsSlice = createSlice({
  name: 'terms',
  initialState,
  reducers: {
    // 정보 가져오기
    getTermsAction: (state, action) => {
      return state;
    },
    // 디테일 정보 가져 오기
    getTermsDetailAction: (state, action) => {
      return state;
    },
    // 정보 넣기
    insetTermsAction: (state, action) => {
      state.list = action.payload.list;
      state.paging = action.payload.paging;
    },
    // 디테일 정보 넣기
    insertTermsDetailAction: (state, action) => {
      state.termsDetail = action.payload.termsDetail;
    },
    // 정보 등록하기
    registerTermsAction: (state, action) => {
      return state;
    },
    // 정보 수정하기
    updateTermsAction: (state, action) => {
      return state;
    },
    // 정보 삭제하기
    deleteTermsAction: (state, action) => {
      return state;
    },
    changeTabMenu: (state, action) => {
      state.tab = action.payload.tab;
    },
    // 정보 초기화하기
    termsReset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  // 정보 가져오기
  getTermsAction,
  // 상세 정보 가져 오기
  getTermsDetailAction,
  // 정보 넣기
  insetTermsAction,
  // 디테일 정보 넣기
  insertTermsDetailAction,
  // 정보 등록하기
  registerTermsAction,
  // 정보 수정하기
  updateTermsAction,
  // 정보 삭제하기
  deleteTermsAction,
  // 탭 체인지
  changeTabMenu,
  // 정보 초기화하기
  termsReset,
} = termsSlice.actions;

export default termsSlice.reducer;
