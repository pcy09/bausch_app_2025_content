import { createSlice } from '@reduxjs/toolkit';
import { SavingPoint } from '@/store/initialState';

const initialState = SavingPoint;

export const savingPointSlice = createSlice({
  name: 'savingPoint',
  initialState,
  reducers: {
    // 적립금 리스트 호출
    getSavingPointAction: state => {
      return state;
    },
    // 적립금 리스트 넣기
    insertSavingPointAction: (state, action) => {
      state.pointProductGroup = action.payload.pointProductGroup;
    },
    // 적립금 등록
    createSavingPointAction: state => {
      return state;
    },
    // 적립금 상세
    getSavingPointDetailAction: (state, action) => {
      return state;
    },
    insertSavingPointDetail: (state, action) => {
      state.pointProductDetail = action.payload.pointProductDetail;
    },
    // 적립금 삭제
    deleteSavingPointAction: state => {
      return state;
    },

    // 적립금 수정
    updateSavingPointDetailAction: (state, action) => {
      return state;
    },

    resetSavingPointAction: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getSavingPointAction,
  insertSavingPointAction,
  createSavingPointAction,
  deleteSavingPointAction,
  resetSavingPointAction,
  getSavingPointDetailAction,
  insertSavingPointDetail,
  updateSavingPointDetailAction,
} = savingPointSlice.actions;

export default savingPointSlice.reducer;
