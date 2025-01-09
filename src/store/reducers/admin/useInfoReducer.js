import { createSlice } from '@reduxjs/toolkit';
import { useInfoInit } from '@/store/initialState';

const initialState = useInfoInit;

export const useInfoSlice = createSlice({
  name: 'useInfo',
  initialState,
  reducers: {
    // 이용가이드 리스트 호출
    getUseInfoAction: state => {
      return state;
    },
    // 이용가이드 리스트 넣기
    insertUseInfoDataAction: (state, action) => {
      state.useInfoList = action.payload.useInfoList;
    },
    // 이용가이드 등록,수정,삭제
    updateUseInfoAction: (state, action) => {
      return state;
    },
    resetUseInfoAction: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { getUseInfoAction, insertUseInfoDataAction, updateUseInfoAction, resetUseInfoAction } = useInfoSlice.actions;

export default useInfoSlice.reducer;
