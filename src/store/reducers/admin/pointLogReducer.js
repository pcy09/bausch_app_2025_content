import { createSlice } from '@reduxjs/toolkit';
import { pointLogInit } from '@/store/initialState';

const initialState = {
  ...pointLogInit,
  totalElements: 0,
};

export const pointLogSlice = createSlice({
  name: 'pointLog',
  initialState,
  reducers: {
    // 리스트
    getPointLogListAction: (state, action) => {
      return state;
    },

    insertPointLogListAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },

    changePointLogSearchData: (state, action) => {
      state.search = action.payload;
    },
    // 제품 상세 호출
    getPointLogDetailAction: (state, action) => {
      return state;
    },
    insertpointLogDetailAction: (state, action) => {
      state.productDetail = action.payload.productDetail;
    },

    // 제품 상세 데이터 update
    updatePointLogDetailAction: state => {
      return state;
    },
    // 제품 상세 데이터 update 주입
    upsertPointLogDetailAction: (state, action) => {
      state.productDetail = action.payload.productDetail;
    },

    // 정보 초기화하기
    pointLogReset: state => {
      Object.assign(state, initialState);
    },
    // 제품 삭제
    pointLogDeleteLAction: state => {
      return state;
    },
  },
});

export const {
  // 리스트
  getPointLogListAction,
  // 검색 옵션
  changePointLogSearchData,
  insertPointLogListAction,
  // 리스트 업데이트
  getPointLogDetailAction,
  insertpointLogDetailAction,
  // 상세 업데이트
  updatePointLogDetailAction,
  // 주입
  upsertPointLogDetailAction,
  //초기화
  pointLogReset,
  //삭제
  pointLogDeleteLAction,
} = pointLogSlice.actions;

export default pointLogSlice.reducer;
