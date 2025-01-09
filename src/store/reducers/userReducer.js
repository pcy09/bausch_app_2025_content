import { createSlice } from '@reduxjs/toolkit';
import { userInit } from '@/store/initialState';

const initialState = userInit;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserListAction: (state, action) => {
      return state;
    },
    insertUserListAction: (state, action) => {
      state.userList = action.payload.list;
      state.paging = action.payload.paging;
    },
    getUserDetailAction: (state, action) => {
      return state;
    },
    insertUserDetailAction: (state, action) => {
      state.userDetail = action.payload.detailData;
    },
    updateUserStatusAction: (state, action) => {
      return state;
    },
    updateManyUserStatusAction: (state, action) => {
      return state;
    },
    changeSearch: (state, action) => {
      state.search = action.payload.search;
    },
    changeTabMenu: (state, action) => {
      state.tab = action.payload.tab;
    },
    userReset: state => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  getUserListAction,
  insertUserListAction,
  updateUserStatusAction,
  updateManyUserStatusAction,
  getUserDetailAction,
  insertUserDetailAction,
  changeSearch,
  changeTabMenu,
  userReset,
} = userSlice.actions;

export default userSlice.reducer;
