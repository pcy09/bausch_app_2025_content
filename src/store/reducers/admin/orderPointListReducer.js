import { createSlice } from '@reduxjs/toolkit';
import { OrderPointInit } from '@/store/initialState';

const initialState = {
  ...OrderPointInit,
  totalElements: 0,
};

export const orderPointSlice = createSlice({
  name: 'orderPoint',
  initialState,
  reducers: {
    getPointOrderListAction: (state, action) => {
      return state;
    },
    insertPointOrderListAction: (state, action) => {
      state.content = action.payload.content;
      state.pageable = action.payload.pageable;
      state.totalElements = action.payload.totalElements;
    },
    // 주문내역 상세
    getPointOrderDetailAction: (state, action) => {
      return state;
    },
    insertPointOrderDetailAction: (state, action) => {
      state.pointOrderDetail = action.payload.pointOrderDetail;
    },
    PointOrderReset: state => {
      Object.assign(state, initialState);
    },
    deletePointOrderListAction: state => {
      return state;
    },
    changeSearchData: (state, action) => {
      state.search = action.payload;
    },
  },
});
export const {
  insertPointOrderListAction,
  getPointOrderDetailAction,
  insertPointOrderDetailAction,
  PointOrderReset,
  deletePointOrderListAction,
  getPointOrderListAction,
  changeSearchData,
} = orderPointSlice.actions;

export default orderPointSlice.reducer;
