import { createSlice } from '@reduxjs/toolkit';
import { pointProductChangeModalInit } from '@/store/initialState';

const initialState = pointProductChangeModalInit;

export const pointProductChangeModalSlice = createSlice({
  name: 'pointProductChangeModal',
  initialState,
  reducers: {
    openPointProductChangeModalAction: (state, action) => {
      state.show = true;
      state.data = action.payload.data;
    },
    // 제품 드랍 가져오기
    getPointDropDataAction: (state, action) => {
      return state;
    },
    // 제품 드랍 정보 담기
    insertPointDropDataAction: (state, action) => {
      state.productDropData = action.payload.productDropData;
    },

    // 근시 정보 가져오기
    getPointMyopiaAction: (state, action) => {
      return state;
    },

    // 근시 정보 담기
    insertPointMyopiaAction: (state, action) => {
      state.myopiaData = action.payload.myopiaData;
    },

    // // 제품 변경
    updatePointProductAction: (state, action) => {
      return state;
    },

    pointProductChangeModalReset: (state, action) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  openPointProductChangeModalAction,
  getPointDropDataAction,
  insertPointDropDataAction,
  getPointMyopiaAction,
  insertPointMyopiaAction,
  updatePointProductAction,
  pointProductChangeModalReset,
} = pointProductChangeModalSlice.actions;

export default pointProductChangeModalSlice.reducer;
