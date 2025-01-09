import { createSlice } from '@reduxjs/toolkit';
import { OrderInit } from '@/store/initialState';

const initialState = OrderInit;

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    //주문 관리 리스트
    getOrderListAction: (state, action) => {
      return state;
    },
    insertOrderListAction: (state, action) => {
      state.transactionListData = action.payload.transactionListData;
      state.totalElements = action.payload.totalElements;
    },
    changeOrderSearchData: (state, action) => {
      state.search = action.payload;
    },
    webOrderActiveAction: state => {
      return state;
    },

    orderReset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const { getOrderListAction, insertOrderListAction, orderReset, changeOrderSearchData, webOrderActiveAction } = orderSlice.actions;

export default orderSlice.reducer;
