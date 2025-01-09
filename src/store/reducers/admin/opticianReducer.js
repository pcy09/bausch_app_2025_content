import { createSlice } from '@reduxjs/toolkit';
import { OpticianInit } from '@/store/initialState';

const initialState = OpticianInit;

export const opticianSlice = createSlice({
  name: 'optician',
  initialState,
  reducers: {
    // 안경원 리스트
    getOpticianListAction: (state, action) => {
      return state;
    },
    insertOpticianListAction: (state, action) => {
      state.opticianList = action.payload.opticianList;
      state.paging = action.payload.paging;
    },
    // 안경원 검색 데이터
    changeSearchData: (state, action) => {
      state.search = action.payload;
    },
    // 안경원 상세
    getOpticianDetailAction: (state, action) => {
      return state;
    },
    insertOpticianDetailAction: (state, action) => {
      state.opticianDetail = action.payload.opticianDetail;
    },
    // 안경원 매장 노출 수정
    updateOpticianAction: (state, action) => {
      return state;
    },
    opticianReset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getOpticianListAction,
  insertOpticianListAction,
  getOpticianDetailAction,
  insertOpticianDetailAction,
  updateOpticianAction,
  changeSearchData,
  opticianReset,
} = opticianSlice.actions;

export default opticianSlice.reducer;
