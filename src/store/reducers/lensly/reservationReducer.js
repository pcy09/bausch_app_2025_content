import { createSlice } from '@reduxjs/toolkit';
import { ReservationInit } from '@/store/initialState';

const initialState = ReservationInit;

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    getReservationListAction: (state, action) => {
      return state;
    },
    insertReservationListAction: (state, action) => {
      state.reservationList = action.payload.reservationList;
      state.paging = action.payload.paging;
    },
    changeReservationStatusAction: (state, action) => {
      return state;
    },
    changeSearchDataAction: (state, action) => {
      state.searchData = action.payload.searchData;
    },
    changeTabMenu: (state, action) => {
      state.tab = action.payload.tab;
    },
    reservationReset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getReservationListAction,
  insertReservationListAction,
  changeReservationStatusAction,
  changeSearchDataAction,
  changeTabMenu,
  reservationReset,
} = reservationSlice.actions;

export default reservationSlice.reducer;
